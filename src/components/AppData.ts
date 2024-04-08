import { ICatalogItem, ICardItem, IPaymentState, IContactsState, IOrder, FormErrors, IAppState} from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/Events';

export class AppState implements IAppState {
	catalog: ICatalogItem[];
	cartItems: ICardItem[];
	total: number;
	order: IOrder = {
		payment: null,
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	formErrors: FormErrors = {};
	cartState: Set<string>;
	paymentState: IPaymentState;
	contactsState: IContactsState;

	constructor(protected events: IEvents) {
		this.cartState = new Set();
		this.paymentState = { payment: null, address: null };
		this.contactsState = { email: null, phone: null };
	}

	setCatalog(items: ICatalogItem[]): void {
		this.catalog = items.map((item) => {
			item.status = false;
			return new CatalogItem(item, this.events);
		});
		this.events.emit('items:changed', { catalog: this.catalog });
	}

	addItemCart(item: ICatalogItem): void {
		if (!this.cartState.has(item.id)) {
			this.cartState.add(item.id);
			item.status = true;
		} else console.error('your item is allready in the cart');

		this.events.emit('preview:changed', item);
		this.events.emit('cart:updateCounter', {
			count: this.cartState.size,
		});
	}

	setCartPreview() {
		this.cartItems = this.catalog.filter((item) =>
			[...this.cartState].includes(item.id)
		);
		this.getTotal();
		this.events.emit('cart:preview', { count: this.cartState.size });
	}

	getTotal(): number {
		this.total = this.cartItems.reduce((acc, next) => {
			return next.price === null ? acc : acc + next.price;
		}, 0);
		return this.total;
	}

	removeCartItem(item: ICardItem): void {
		item.status = false;
		this.cartState.delete(item.id);
		this.getTotal();
		this.events.emit('cart:open');
		this.events.emit('cart:updateCounter', {
			count: this.cartState.size,
		});
	}

	setAddress(address: string): void {
		this.paymentState.address = address;
	}

	setPaymentType(paymentType: string): void {
		this.paymentState.payment = paymentType;
	}

	setPhone(phone: string): void {
		this.contactsState.phone = phone;
	}

	setEmail(email: string): void {
		this.contactsState.email = email;
	}

	isOrderValid(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.paymentState.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.paymentState.payment) {
			errors.payment = 'Необходимо указать тип оплаты';
		}
		this.formErrors = errors;
		this.events.emit('orderErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	isContactsValid(): boolean {
		const errors: typeof this.formErrors = {};
		
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!this.contactsState.email || !emailRegex.test(this.contactsState.email)) {
			errors.email = 'Введите корректный email адрес';
		}
	
		const phoneRegex = /^\+?[0-9]{1,3}[\s\-]?(\([0-9]+\)|[0-9]+)[\s\-]?[0-9]+[\s\-]?[0-9]+$/;
		if (!this.contactsState.phone || !phoneRegex.test(this.contactsState.phone)) {
			errors.phone = 'Введите корректный номер телефона';
		}
	
		this.formErrors = errors;
		this.events.emit('contactsErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	getPricelessItems(): Set<string> {
		const pricelessItems = this.catalog.filter((item) => {
			return item.price === null || 0;
		});
		const setPriceless: Set<string> = new Set();
		pricelessItems.forEach((item) => setPriceless.add(item.id));
		return setPriceless;
	}

	clearAllItems(): void {
		this.cartItems.forEach((item) => (item.status = false));
		this.cartState.clear();
		this.events.emit('cart:updateCounter', {
			count: this.cartState.size,
		});
		this.events.emit('items:changed');
	}

	createOrder(): void {
		const setPriceless = this.getPricelessItems();
		this.order.items = Array.from(this.cartState).filter(
			(id) => !setPriceless.has(id)
		);
		this.order.email = this.contactsState.email;
		this.order.phone = this.contactsState.phone;
		this.order.payment = this.paymentState.payment;
		this.order.address = this.paymentState.address;
		this.order.total = this.getTotal();
	}
}

export class CatalogItem extends Model<ICatalogItem> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	status: boolean;
}

export class CartList extends Model<ICardItem> {
	id: string;
	title: string;
	price: number | null;
	status: boolean;
}
