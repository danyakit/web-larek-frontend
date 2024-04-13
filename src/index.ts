import './scss/styles.scss';

import { EventEmitter } from './components/base/Events';
import { API_URL as items, CDN_URL as images } from './utils/constants';
import { LarekAPI } from './components/LarekAPI';
import { AppState } from './components/AppData';
import { Page } from './components/Page';
import { ensureElement, cloneTemplate } from './utils/utils';
import { ICatalogItem, ICardItem, TUpdateCounter } from './types';
import { Card as CatalogItem, Card as CartItem } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/Basket';
import { OrderForm } from './components/OrderForm';
import { ContactsForm } from './components/ContactsForm';
import { Success } from './components/Success';

const events = new EventEmitter();
const api = new LarekAPI({ items, images });
const appData = new AppState(events);

const page = new Page(document.body, {
	onClick: (event) => events.emit('cart:open', event),
});
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const itemCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const basket = new Basket(cloneTemplate(cartTemplate), {
	onClick: () => events.emit('order:open'),
});

events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('preview:changed', item),
		});

		if (item.status) {
            card.setDisabled(card.button, true);
            card.setText(card.button, 'Нельзя купить');
        }

		card.setCategoryCard(item.category);
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
			id: '',
			status: false,
			description: '',
			statusBtn: false
		});
	});
});

events.on('preview:changed', (item: ICatalogItem) => {
	const card = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('cart:changed', item),
	});
	card.toggleButton(item.status);
	card.setCategoryCard(item.category);
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
			description: item.description,
			statusBtn: item.status,
			id: '',
			status: false
		}),
	});
});

events.on('cart:open', () => {
	appData.setCartPreview();
	basket.price = appData.getTotal();
	modal.render({ content: basket.render() });
});

events.on('cart:preview', (cartState: TUpdateCounter) => {
	basket.items = appData.cartItems.map((item) => {
		const cartItem = new CartItem(cloneTemplate(itemCartTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return cartItem.render({
			title: item.title,
			price: item.price,
			category: '',
			id: '',
			status: false,
			image: '',
			description: '',
			statusBtn: false
		});
	});
	basket.setOrderButton(cartState.count);
	basket.setOrderIndex();
});

events.on('cart:changed', (item: ICatalogItem) => {
	if (!item.status) {
		appData.addItemCart(item);
		modal.toggleCartBtn(item.status);
	} 
});

events.on('card:remove', (item: ICardItem) => {
	appData.removeCartItem(item);
	appData.setCartPreview();
});

const order = new OrderForm(cloneTemplate(orderTemplate), events, {
	onClickPayment: (event: Event) => {
		const paymentType = (event.target as HTMLElement).getAttribute('name');
		appData.setPaymentType(paymentType);
		order.setStyleBorder(paymentType);
		order.setNextToggle(appData.isOrderValid());
	},
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			valid: appData.isOrderValid(),
			errors: [],
		}),
	});
});

events.on('order.address:change', () => {
	appData.setAddress(order.address);
	order.setNextToggle(appData.isOrderValid());
});

events.on('orderErrors:change', (errors: Record<string, string>) => {
	if (errors) order.errors = `${errors.payment || ''} ${errors.address || ''}`;
	else order.errors = '';
});

events.on('contactsErrors:change', (errors: Record<string, string>) => {
	if (errors) contacts.errors = `${errors.email || ''} ${errors.phone || ''}`;
	else order.errors = '';
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: appData.isContactsValid(),
			errors: [],
		}),
	});
});

const contacts = new ContactsForm(cloneTemplate(contactsTemplate), events, {
    onSubmit: () => {
        appData.createOrder();
        api
            .orderItems(appData.order)
            .then((response) => {
                console.log(response);
                appData.clearAllItems();
                events.emit('success');
            })
            .catch((error) => {
                events.emit('cart:open');
                console.error(error);
            });
    },
});


events.on(/^contacts\..*:change/, () => {
	appData.setPhone(contacts.phone);
	appData.setEmail(contacts.email);
	contacts.setNextToggle(appData.isContactsValid());
	appData.isContactsValid();
});

events.on('success', () => {
	const success = new Success(cloneTemplate(successTemplate), {
		onClick: () => {
			events.emit('items:changed');
			modal.close();
		},
	});
	modal.render({
		content: success.render({
			totalPrice: appData.getTotal(),
		}),
	});
});

events.on('modal:open', () => (page.locked = true));
events.on('modal:close', () => (page.locked = false));

events.on('cart:updateCounter', (count: TUpdateCounter) => {
	page.cartCounter = count;
});

api
	.getCatalogList()
	.then(appData.setCatalog.bind(appData))
	.catch((error) => console.log(error));