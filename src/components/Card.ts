import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { TCardActions, ICardView, TCard, Category, ICardItem, ICatalogItem } from '../types';

export class Card extends Component<TCard> implements ICardView {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLSpanElement;
	protected _category?: HTMLSpanElement;
	protected _description?: HTMLParagraphElement;
	protected _button?: HTMLButtonElement;
	protected _statusBtn: boolean;
	textContent: string;

	constructor(
		container: HTMLElement,
		actions: TCardActions,
		protected blockName: string = 'card'
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._price = ensureElement<HTMLSpanElement>(
			`.${blockName}__price`,
			container
		);
		this._category = container.querySelector(`.${blockName}__category`);
		this._description = container.querySelector(
			`.${blockName}__text`
		) as HTMLParagraphElement;
		this._button = container.querySelector(`.${blockName}__button`);
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}	
	}

	render(data: ICardItem) {
        super.render(data);
        this.setCategoryCard(data.category);
        if (data.price === null) {
            this.statusBtn = true; 
            this.setDisabled(this._button, true); 
            this.setText(this._button, 'Нельзя купить'); 
        } else {
            this.statusBtn = false;
            this.setText(this._price, `${data.price} синапсов`);
        }
        return this.container;
    }

	get button(): HTMLButtonElement {
		return this._button;
	}

	get statusBtn(): boolean {
		return this._statusBtn;
	}
	set statusBtn(value: boolean) {
		this._statusBtn = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	get price(): string {
		return this._price.textContent || '';
	}

	set price(value: string) {
		if (value === null) this.setPrice(this._price, 'Бесценно');
		else this.setPrice(this._price, `${value} синапсов`);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set category(value: string) {
		this.setCategory(this._category, value);
	}

	get description(): string {
		return this._category.textContent || 'нельзя купить';
	}

	set description(value: string) {
		this.setDescription(this._description, value);
	}

	protected setImage(imageElement: HTMLImageElement, src: string, alt?: string) {
		if (this._image) {
		imageElement.src = src;
		if (alt) imageElement.alt = alt;
		}
	}		

	protected setPrice(element: HTMLSpanElement, value: unknown) {
		this.setText(element, value);
	}

	protected setCategory(element: HTMLSpanElement, value: unknown) {
		this.setText(element, value);
	}

	protected setDescription(element: HTMLSpanElement, value: unknown) {
		this.setText(element, value);
	}

	setCategoryCard(value: string) {
		this.toggleClass(this._category, Category.get(value), true);
	}

	toggleButton(disabled: boolean) {
        this.setDisabled(this._button, disabled);
    }
}
