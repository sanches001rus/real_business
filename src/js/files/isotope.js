/*

*/

// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, FLS } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import Isotope from 'isotope-layout/js/isotope.js';
// https://www.youtube.com/watch?v=Et2QxOLnp8Q
const items = document.querySelector('[data-iso-items]');
if (items) {
	const itemsGrid = new Isotope(items, {
		itemSelector: '[data-iso-item]',
		layoutMode: 'vertical',
		getSortData: {
			// name: '.sort_it',
			price: function (itemElem) {
				let price = itemElem.querySelector('.sort_it').textContent
				price = parseInt(price)
				console.log(price);
				return price
			}
		}
	});
	// let sortByValue = 
	itemsGrid.arrange({ sortBy: 'price' })
	// console.log(itemsGrid.arrange);
	// itemsGrid.isotope({ sortBy: 'date' });
}

