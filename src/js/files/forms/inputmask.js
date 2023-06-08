/* Маски для полів (у роботі) */

// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { flsModules } from "../modules.js";

// Підключення модуля
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll('input');
if (inputMasks.length) {
	// flsModules.inputmask = 


	// const telmask = Inputmask({ regex: "\\+7 \\([8-9][0-9][0-9]\\) [0-9]{3}-[0-9]{2}-[0-9]{2}" }).mask(document.querySelectorAll("input[type=tel]"));


	var phoneInput = document.querySelectorAll("input[type=tel]");
	var maskOptions = {
		// mask: '+7 (999) 999-99-99',
		// regex: "\\+7 \\([8-9][0-9][0-9]\\) [0-9]{3}-[0-9]{2}-[0-9]{2}",
		regex: "\\+7 \\([0-9][0-9][0-9]\\) [0-9]{3}-[0-9]{2}-[0-9]{2}",
		// placeholder: '',
		onBeforePaste: function (pastedValue) {
			// 89284729532
			// +71284729532
			if (pastedValue[0] === '8') {
				return pastedValue.slice(1)
			} else if (pastedValue[0] === '+' && pastedValue[1] === '7') {
				return pastedValue.slice(2)
			}
		}
	};
	var phoneMask = new Inputmask(maskOptions);
	phoneMask.mask(phoneInput);
}


function tel_mask(tel) {
	// 9284729532  test
	// 89284729532 test
	// +79284729532 test
	// +7 (928) 472-95-32  mask


	// const mask = '\+7 \([8-9][0-9][0-9]\) [0-9]{3}-[0-9]{2}-[0-9]{2}'
	// const start = '+7 ()'

	let parsed_value = ''
	let parsed_value_length = ''
	const start_mask = '+7 (___) ___-__-__'


	function _error_tel_input(message = 'error_tel_input') {
		console.error(message);
	}

	function setParsedValue(value) {
		const reg = new RegExp(/\D/g)
		let replaced = value.replace(reg, "");
		if (reg.test(replaced) || !replaced) {
			_error_tel_input('Вставленное значение не содержит цифр')
			// return false
			parsed_value = ''
			parsed_value_length = 0
		}
		// return Number(replaced)
		parsed_value = Number(replaced)
		parsed_value_length = replaced.length
	}

	tel.addEventListener('paste', function (event) {
		event.preventDefault()
		const clipboardData = event.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('text');

		function _validatePastedValue(value) {
			if (!value) {
				return
			}

			value = String(value)
			const length = value.length
			const firstSymbol = value[0]
			const secondSymbol = value[1]

			// console.log('length ' + length);
			// console.log('firstSymbol ' + firstSymbol);
			// console.log('secondSymbol ' + secondSymbol);

			let result = ''

			if (firstSymbol === '8' && secondSymbol === '9' && length === 11) {
				// 89284729532
				// Если с 8 
				// второй символ 9
				// длинна 11
				// console.log(1111111111111);
				result = value.replace('8', '7');
				// console.log(result);

			} else if (firstSymbol === '7' && secondSymbol === '9' && length === 11) {
				// +79284729532
				// Если с 7
				// второй символ 9
				// длинна 11
				// console.log(2222222222222);
				result = value;
				// console.log(result);
			} else if (firstSymbol === '9' && length === 10) {
				// 9284729532
				// Если с 9
				// длинна 10
				// console.log(3333333333333);
				result = '7' + value;
				// console.log(result);
			} else {
				_error_tel_input('Вставленное значение не является номером телефона')
				return false
			}
			return result
		}

		function _pastedValueToFormat(value) {
			if (!value) {
				return
			}

			let maskedNumber = "";
			for (let i = 0; i < value.length; i++) {
				// 9284729532
				switch (i) {
					case 0:
						maskedNumber += '+' + value[i] + ' (';
						break;
					case 3:
						maskedNumber += value[i] + ') ';
						break;
					case 6:
						maskedNumber += value[i] + '-';
						break;
					case 8:
						maskedNumber += value[i] + '-';
						break;
					default:
						maskedNumber += value[i];
						break;
				}
				// console.log(i + ' ' + value[i] + ' ' + maskedNumber);
			}
			return maskedNumber;
		}

		// const parsed_value = parsedValue(pastedData)
		setParsedValue(pastedData)
		const validated_value = _validatePastedValue(parsed_value)
		this.value = _pastedValueToFormat(validated_value)
	})



	function _set_default_mask(el) {
		const length = String(parsed_value).length
		if (length > 1) {
			return
		}
		// вставляем стартовую маску
		el.value = '+7 (___) ___-__-__'
		el.setSelectionRange(4, 4);
	}

	tel.addEventListener('focus', function (event) {
		_set_default_mask(tel)

	})

	tel.addEventListener('click', function (event) {
		_set_default_mask(tel)
	})
	tel.addEventListener('blur', function (event) {
		if (String(parsed_value).length <= 1) {
			this.value = ''
		}
	})




	tel.addEventListener('input', function (event) {
		setParsedValue(this.value)
		_set_default_mask(tel)

		// console.log(parsed_value);
		// console.log(parsed_value_length);

		// console.log(this.value);
		const current_symbol = event.data
		console.log(event);


		// console.log(this.value.indexOf(event.data));


		// console.log(this.value);
		// const parsed_value = parsedValue(this.value)
		// if (parsed_value <= 1) {
		// 	_set_default_mask(tel)
		// 	return
		// }
		// _set_default_mask(tel)
		// _set_default_mask(tel)
		// const length = this.value.length
		// const parsed_value = parsedValue(this.value)
		// console.log(this.value);
		// console.log(length);
		// console.log(parsed_value);
	})


}


// const tels = document.querySelectorAll('input[type=tel]');
// for (let index = 0; index < tels.length; index++) {
// 	const tel = tels[index];
// 	// tel_mask(tel)
// }


