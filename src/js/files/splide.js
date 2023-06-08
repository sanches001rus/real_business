import { Splide } from "@splidejs/splide";
import { Grid } from '@splidejs/splide-extension-grid';





function initSliders() {



	const slider_main_banner = document.querySelector('.slider-main-banner .splide');
	if (slider_main_banner) {
		new Splide('.slider-main-banner .splide', {
			type: 'loop',
			speed: 800,
			arrows: false,
		}).mount();
	}



	const slider_stages = document.querySelector('.slider-stages .splide');
	if (slider_stages) {
		const slider_stages_slider = new Splide('.slider-stages .splide', {
			autoWidth: true,
			drag: 'free',
			mediaQuery: 'min',
			gap: "30px",
			padding: "20px",
			speed: 800,
			arrows: false,
		})

		slider_stages_slider.on( 'overflow', function ( isOverflow ) {
			slider_stages_slider.options = {
			//   arrows    : isOverflow,
			  pagination: isOverflow,
			  drag      : isOverflow,
			};
		 } );

		slider_stages_slider.mount();
		// _createPagination(paginationElement, splide);
		// _createCustomArrows(prev, next, splide);
	}

	const slider_bonuses = document.querySelector('.bonuses__slider .splide');
	if (slider_bonuses) {
		const bonuses_slider = new Splide('.bonuses__slider .splide', {
			autoWidth: true,
			drag: 'free',
			gap: "1.25rem", // 20 / 16 + rem
			padding: "20px",
			speed: 800,
			arrows: false,
			pagination: false
		})
		
		bonuses_slider.on( 'overflow', function ( isOverflow ) {
			bonuses_slider.options = {
			//   arrows    : isOverflow,
			  pagination: isOverflow,
			  drag      : isOverflow,
			};
		 } );
		
		bonuses_slider.mount();	
	}

	
	const slider_partners = document.querySelector('.partners__slider .splide');
	if (slider_partners) {
		const slider_partners_slider = new Splide('.partners__slider .splide', {
			autoWidth: true,
			drag: 'free',
			gap: "3.125rem", // 50 / 16 + rem
			// padding: "20px",
			speed: 800,
			arrows: false,
			pagination: false
		})

		slider_partners_slider.on( 'overflow', function ( isOverflow ) {
			slider_partners_slider.options = {
			  pagination: isOverflow,
			  drag      : isOverflow,
			};
		 } );

		 slider_partners_slider.mount();

	}

	const slider_tariff_cards = document.querySelector('.bank-page__tariff-cards .splide');
	if (slider_tariff_cards) {

		new Splide('.bank-page__tariff-cards .splide', {
			autoWidth: true,
			mediaQuery: 'min',
			breakpoints: {
				 1110: {
					 drag: false
				 },
			},
			// drag: 'free',
			gap: "1.875rem",
			padding: "15px",
			speed: 800,
			arrows: false,
			// pagination: false
		}).mount();
	}

	const slider_bank_advantages_cards = document.querySelector('.bank-advantages-cards .splide');
	if (slider_bank_advantages_cards) {
		new Splide('.bank-advantages-cards .splide', {
			// padding: "15px",
			drag: 'free',
			autoWidth: true,
			autoHeight: true,
			gap: '20px',
			mediaQuery: 'min',
			breakpoints: {
				 992: {
					 destroy: true
				 },
			},
			speed: 800,
			arrows: false,
			pagination: true
		}).mount();
	}

	const slider_bank_tariffs_table = document.querySelector('.bank-tariffs-table .splide');
	if (slider_bank_tariffs_table) {
		const slider_bank_tariffs_table_slider = new Splide('.bank-tariffs-table .splide', {
			autoWidth: true,
			waitForTransition: false,
			speed: 800,
			arrows: false,
			pagination: true
		});

		slider_bank_tariffs_table_slider.on( 'overflow', function ( isOverflow ) {
			slider_bank_tariffs_table_slider.options = {
			//   arrows    : isOverflow,
			  pagination: isOverflow,
			  drag      : isOverflow,
			};
		 } );


		 slider_bank_tariffs_table_slider.on( 'mounted', function () {

			if (slider_bank_tariffs_table_slider.length <= 5) {
				slider_bank_tariffs_table_slider.options = {
					// perPage: 4,
					autoWidth: false,
					fixedWidth : '182px',
				 };
			}
		 } );



		slider_bank_tariffs_table_slider.mount()	



		slider_bank_tariffs_table_slider.on( 'drag', function (e) {
			// do something
			console.log(slider_bank_tariffs_table_slider.noDrag);
			
		 } );
	}


}

window.addEventListener("load", function (e) {
	initSliders();
});






	// const prev = document.querySelector('.rooms__slider .slider-arrow_prev')
	// const next = document.querySelector('.rooms__slider .slider-arrow_next')
	// const paginationElement = document.querySelector('.rooms__slider .slider-pagination');

		// _createPagination(paginationElement, splide);
	// _createCustomArrows(prev, next, splide);
	

// function _createCustomArrows(prev, next, splide) {
// 	if (!prev || !next) {
// 		console.error('Не найдены стрелки')
// 		return
// 	}
// 	prev.addEventListener('click', function () {
// 		splide.go('<');
// 	})
// 	next.addEventListener('click', function () {
// 		splide.go('>');
// 	})
// }

// function _createPagination(paginationElement, splide) {
// 	if (!paginationElement) {
// 		console.error('Не найден элемент пагинации')
// 		return
// 	}
// 	splide.on('mounted', function () {
// 		for (let i = 0; i < splide.length; i++) {
// 			const button = document.createElement('button');
// 			button.classList.add('slider-pagination__bullet')
// 			// button.textContent = i + 1;
// 			button.addEventListener('click', () => {
// 				splide.go(i);
// 			});
// 			paginationElement.appendChild(button);
// 		}

// 		_setActiveClassToPagination()
// 	});

// 	splide.on('move', () => {
// 		_setActiveClassToPagination()
// 	});

// 	function _setActiveClassToPagination() {
// 		const index = splide.index;
// 		const activeButton = paginationElement.querySelector('button.slider-pagination__bullet_active');
// 		if (activeButton) {
// 			activeButton.classList.remove('slider-pagination__bullet_active');
// 		}
// 		const newActiveButton = paginationElement.querySelector(`button:nth-child(${index + 1})`);
// 		if (newActiveButton) {
// 			newActiveButton.classList.add('slider-pagination__bullet_active');
// 		}
// 	}
// }