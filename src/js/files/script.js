// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, spollers, showMore, _slideUp, _slideDown, bodyLock, bodyUnlock } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";





function my_toggle_func(element, triggerClass, parentClass, hiddenBlockClass, triggerActiveClass, defaultText = '', activeText = '', duration = 500) {

	if (element.classList.contains(triggerClass)) {

		const hidden_block = element.closest(`.${parentClass}`).querySelector(`.${hiddenBlockClass}`)

		if (hidden_block.hasAttribute('hidden')) {
			element.classList.add(triggerActiveClass)
			if (activeText) {
				element.innerHTML = activeText
			}

			_slideDown(hidden_block, duration)
			element.style.pointerEvents = 'none';

		} else {
			element.classList.remove(triggerActiveClass)
			if (defaultText) {
				element.innerHTML = defaultText
			}
			_slideUp(hidden_block, duration)
			element.style.pointerEvents = 'none';
		}
	}

	document.addEventListener('slideDownDone', function () {
		element.style.pointerEvents = 'auto';
	})

	document.addEventListener('slideUpDone', function (e) {
		element.style.pointerEvents = 'auto';
	})
}


// HEADER MENU
class Overlay {
	constructor() {
		this.overlayElement = document.createElement('div');
		this.overlayElement.classList.add('overlay');
		this.isVisible = false;

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		document.body.appendChild(this.overlayElement);

		this.overlayElement.addEventListener('click', () => {
			console.log('overflowClick');
			document.dispatchEvent(new CustomEvent("overflowClick", {
			}));
		});
	}


	show() {
		this.overlayElement.classList.add('show');
		this.isVisible = true;
		// document.querySelector('html').classList.add('lock')
		// bodyLock()

	}
	hide() {
		this.overlayElement.classList.remove('show');
		this.isVisible = false;
		// bodyUnlock()
		// document.querySelector('html').classList.remove('lock')
	}
}
const overlay = new Overlay();

class Menu {
	constructor(menuElement) {
		this.menuElement = menuElement;
		this.burgerElement = this.menuElement.closest('.header__body').querySelector('.icon-menu')
		this.listElement = this.menuElement.closest('.header__body');
		this.submenuElements = this.menuElement.querySelectorAll('.menu__sub-list');

		this.burgerElement.addEventListener('click', this.toggleMenu.bind(this));

		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
				this.closeMenu();
			}
		});
	}

	toggleMenu() {
		if (this.listElement.classList.contains('show')) {
			this.closeMenu()
		} else {
			this.openMenu()
		}
	}

	openMenu() {
		this.burgerElement.classList.add('menu-open')
		this.listElement.classList.add('show');
		bodyLock()
	}
	closeMenu() {
		this.burgerElement.classList.remove('menu-open')
		this.listElement.classList.remove('show');
		this.submenuElements.forEach(submenuElement => {
			submenuElement.closest('.menu__item').classList.remove('show');
			_slideUp(submenuElement, 0)
		});
		overlay.hide()
		bodyUnlock()
	}


}
const menuElement = document.querySelector('.header__menu');
if (menuElement) {
	const menu = new Menu(menuElement);
}


class Submenu {
	constructor(submenuElement) {
		this.submenuElement = submenuElement; //блок свб меню
		this.submenuToggle = this.submenuElement.closest('.menu__item'); // родительский элемент
		this.submenuToggle.querySelector('.menu__arrow').addEventListener('click', this.toggleSubmenu.bind(this)); // кнопка

		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
				this.closeSubmenu(0);
			}
		});
		document.addEventListener('overflowClick', () => {
			this.closeSubmenu()
		});
	}

	openSubmenu() {
		this.submenuToggle.classList.add('show');
		overlay.show()
		_slideDown(this.submenuElement, 500)
	}
	closeSubmenu(duration = 500) {
		_slideUp(this.submenuElement, duration)
		this.submenuToggle.classList.remove('show');
		overlay.hide()
	}

	toggleSubmenu(event) {
		if (!this.submenuToggle.classList.contains('show')) {
			this.openSubmenu()
		} else {
			this.closeSubmenu()
		}
	}
}
const submenuElements = document.querySelectorAll('.menu__sub-list');
if (submenuElements) {
	submenuElements.forEach(submenuElement => {
		new Submenu(submenuElement);
	});
}


// ------------------------------
// autoheight table rows

function autoheight_table_rows() {

	const columns = document.querySelectorAll('.bank-tariffs-table-block__list')

	const all_sizes = _get_sizes()
	const result_heights = _get_max_sizes(all_sizes)

	set_sizes()
	window.addEventListener('resize', () => {
		set_sizes()
		// console.log('asdawwf');
	});

	function set_sizes() {
		for (let index = 0; index < columns.length; index++) {
			const column = columns[index];
			const rows = column.querySelectorAll('li')

			for (let idx = 0; idx < rows.length; idx++) {
				const elem = rows[idx]
				const new_height = result_heights[idx]
				// console.log(new_height);
				elem.setAttribute("style", `height:${new_height}px`);
			}
		}
	}

	function _get_sizes() {
		let sizes = []
		for (let index = 0; index < columns.length; index++) {
			const column = columns[index];
			const rows = column.querySelectorAll('li')
			let size_2 = []

			for (let idx = 0; idx < rows.length; idx++) {
				const elem = rows[idx]
				const height = elem.offsetHeight;
				size_2.push(height)
				// elem.setAttribute("style", "height:300px");
				// console.log(height);
			}
			sizes.push(size_2)
		}
		return sizes.flat()
	}
	function _get_max_sizes(all_sizes) {

		let result_lengths = []

		for (let index = 0; index < columns.length; index++) {
			const element = columns[index]

			let arr = []
			for (let idx = 0; idx < columns.length; idx++) {
				const el = columns[idx];
				arr.push(all_sizes[(idx * 6) + index])
			}
			const max = Math.max(...arr)
			result_lengths.push(max)
		}
		return result_lengths
	}
}





// CALCULATOR PAGE
function toggle_full_info() {

	document.addEventListener('click', function (e) {
		const element = e.target



		my_toggle_func(
			element,
			'controls-calculator-page-bank-card-main-info-block__item_toggle-full-info',
			'calculator-page-bank-card',
			'calculator-page-bank-card__full-info-block',
			'controls-calculator-page-bank-card-main-info-block__item_toggle-full-info_active',
			'Подробнее',
			'Скрыть'
		)

		my_toggle_func(
			element,
			"controls-calculator-page-bank-card-main-info-block__item_toggle-other-tariffs",
			"calculator-page-banks-cards",
			"calculator-page-banks-cards__sub-card-block",
			"controls-calculator-page-bank-card-main-info-block__item_toggle-other-tariffs_active",
			'Еще тарифы',
			'Скрыть'
		)
	})
}




window.addEventListener("load", function (e) {
	toggle_full_info()
	spollers()
	autoheight_table_rows()

});



















///////////////////


// отслеживание классов по клику
document.addEventListener('click', documentAction)
function documentAction(e) {
	const targetElement = e.target

}