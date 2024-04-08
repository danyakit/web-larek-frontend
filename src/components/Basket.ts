import { Component } from './base/Component';
import { createElement, ensureElement } from '../utils/utils';
import { IShoppingCardView, TShopCardActions, TShoppingCard } from '../types';

export class Basket
	extends Component<TShoppingCard>
	implements IShoppingCardView
{
	protected _items: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _itemIndex: HTMLElement;

	constructor(container: HTMLElement, actions: TShopCardActions) {
		super(container);
		this._items = ensureElement<HTMLElement>('.basket__list', this.container);
		this._price = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');
		this._itemIndex = this.container.querySelector('.basket__item-index');
		this.items = [];
		if (this._button) this._button.addEventListener('click', actions.onClick);
	}

	set items(items: HTMLElement[]) {
		if (items.length) this._items.replaceChildren(...items);
		else {
			this._items.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Ваша Корзина пуста!',
				})
			);
		}
	}

	setOrderButton(value: number) {
		this.setDisabled(this._button, !value);
	}

	set price(price: number) {
		this.setText(this._price, price + ' cинапсов');
	}

	setOrderIndex() {
		const cardElements = this.container.querySelectorAll('.basket__item');
		cardElements.forEach((cardElement, idx) => {
			const indexElement = cardElement.querySelector('.basket__item-index');
			if (indexElement) {
				this.setText(indexElement, idx + 1);
			}
		});
	}
	
}
