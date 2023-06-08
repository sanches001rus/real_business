// Підключення з node_modules
import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';

// Підключення стилів з scss/base/forms/range.scss
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	/*
	const priceSlider = document.querySelector('#range');
	if (priceSlider) {
		let textFrom = priceSlider.getAttribute('data-from');
		let textTo = priceSlider.getAttribute('data-to');
		noUiSlider.create(priceSlider, {
			start: 0, // [0,200000]
			connect: [true, false],
			range: {
				'min': [0],
				'max': [10000000]
			},
			format: wNumb({
				decimals: 0,
				thousand: ' ',
				suffix: ' ₽'
			})

		});


		var inputFormat = document.getElementById('price-start');

		priceSlider.noUiSlider.on('update', function (values, handle) {
			inputFormat.value = values[handle];
			// console.log(priceSlider.noUiSlider);
		});
		priceSlider.addEventListener('change', function () {
			inputFormat.noUiSlider.set(this.value);

		});

		// const priceStart = document.getElementById('price-start');
		// const priceEnd = document.getElementById('price-end');
		// priceStart.addEventListener('change', setPriceValues);
		// priceEnd.addEventListener('change', setPriceValues);

		// function setPriceValues() {
		// 	let priceStartValue;
		// 	let priceEndValue;
		// 	if (priceStart.value != '') {
		// 		priceStartValue = priceStart.value;
		// 	}
		// 	if (priceEnd.value != '') {
		// 		priceEndValue = priceEnd.value;
		// 	}
		// 	priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
		// }

	}
	*/


	function input_with_slider(inputId, sliderId, from = 0, to, step, suffix) {

		const input = document.getElementById(`${inputId}`)
		const slider = document.getElementById(`${sliderId}`)

		let format = wNumb({
			decimals: 0,
			thousand: ' ',
			suffix: ` ${suffix}`
		})

		if (!input || !slider) {
			return
		}

		function _pip_formatting() {
			const pips = slider.nextElementSibling
			if (pips.classList.contains('input-item-filter-calculator__pips')) {
				const pip_to = pips.children[1]
				function _formatNumber(number) {
					number = Number(number)
					const suffixes = ['', 'тыс', 'млн', 'млрд'];
					const suffixGroups = Math.floor((String(number).length - 1) / 3);

					if (suffixGroups < 1) {
						return number.toString();
					}

					const suffixIndex = Math.min(suffixGroups, suffixes.length - 1);
					const shortNumber = parseFloat((suffixGroups > 1 ? number / 1000 ** suffixIndex : number).toPrecision(3));
					return shortNumber + ' ' + suffixes[suffixIndex];
				}
				pip_to.innerHTML = _formatNumber(to)
			}
		}


		noUiSlider.create(slider, {
			start: 0,
			connect: [true, false],
			step: step,
			range: {
				'min': [0],
				'max': [to]
			},
			format: wNumb({
				decimals: 0,
			})
		});


		function _to_numbers(value) {
			// возвращает число из input
			const regex = /[^0-9]/g
			const replace = value.replace(regex, '')
			return Number(replace)
		}

		function _to_format(value) {
			// возвращает отформатированную строку для input
			const result = format.to(_to_numbers(value))
			return result
		}

		function _check_max(value) {
			if (_to_numbers(value) > to) {
				return to
			}
			if (!_to_numbers(value)) {
				return ''
			}
			return _to_numbers(value)
		}


		input.addEventListener('focus', function () {
			this.value = _check_max(this.value)
		})

		input.addEventListener('input', function () {
			this.value = _check_max(this.value)
			slider.noUiSlider.set(_to_numbers(this.value));
		})

		input.addEventListener('blur', function () {
			this.value = _to_format(this.value)
		})

		input.addEventListener('change', function () {
			if (this.value) {
				this.value = _to_format(this.value)
			} else {
				this.value = ''
			}
		})

		slider.noUiSlider.on('slide', function (values, handle) {
			input.value = _to_format(values[handle]);
		});

		// init
		_pip_formatting()
		input.value = _to_format(input.value)
		slider.noUiSlider.set(_to_numbers(input.value));
	}

	input_with_slider(
		'quantity_pays',
		'quantity_pays_slider',
		0,
		100,
		1,
		'шт'
	)
	input_with_slider(
		'transfer_fl_other',
		'transfer_fl_other_slider',
		0,
		10000000,
		1000,
		'₽'
	)
	input_with_slider(
		'transfer_fl_own',
		'transfer_fl_own_slider',
		0,
		10000000,
		1000,
		'₽'
	)
	input_with_slider(
		'depositing_to_account',
		'depositing_to_account_slider',
		0,
		10000000,
		1000,
		'₽'
	)




}

rangeInit();
