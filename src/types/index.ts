export const Category: Map<string, string> = new Map([
	['софт-скил', 'card__category_soft'],
	['другое', 'card__category_hard'],
	['дополнительное', 'card__category_button'],
	['кнопка', 'card__category_other'],
	['хард-скил', 'card__category_additional'],
]);

export interface ICatalogItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  status: boolean;
}

export interface ICardItem {
	id: string;
	title: string;
	price: number | null;
	status: boolean;
}

export interface ICardList {
  total: number;
  items: ICatalogItem[];
}

export type TCardActions = {
	onClick: (event: MouseEvent) => void;
};

export type TCard = {
	title: string;
	image?: string;
	price: number | null;
	category?: string;
	description?: string;
	button: HTMLButtonElement;
	statusBtn: boolean;
};

export interface ICardView {
	title: string;
	image?: string;
	price: string;
	category?: string;
	description?: string;
	button: HTMLButtonElement;
	statusBtn: boolean;
	setCategoryCard(value: string): void;
}

export type ICards = ICatalogItem & ICardList;

export type IBasketItem = Pick<ICards, 'id' | 'total'> & {
  isMyOrder: boolean
};

export interface IOrderView {
	address: string;
	setNextToggle(state: boolean): void;
	setStyleBorder(paymentType: string): void;
}

export type TOrderForm = {
	address: string;
	payment: string | null;
};

export type TOrderActions = {
	onClickPayment: (event: Event) => void;
};

export type IOrder = {
	items: string[];
	total: number;
} & TOrderForm &
	TContactsForm;


export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type IPaymentState = {
	payment: null | string;
	address: null | string;
};

export type IContactsState = {
	email: null | string;
	phone: null | string;
};

export interface IContactsFormView {
	email: string;
	phone: string;
	setNextToggle(state: boolean): void;
}

export type TContactsForm = {
	email: string;
	phone: string;
};

export interface TContactsActions {
    onClick?: () => void;
    onSubmit?: () => void; 
}

export interface IAppState {
	cartItems: ICardItem[];
	cartState: Set<string>;
	paymentState: IPaymentState;
	contactsState: IContactsState;
	setCatalog(items: ICatalogItem[]): void;
	setAddress(address: string): void;
	setPaymentType(paymentType: string): void;
	setPhone(phone: string): void;
	setEmail(email: string): void;
	isOrderValid(): boolean;
	isContactsValid(): boolean;
	createOrder(): void;
}

export interface IOrderResult {
  id: string;
  total: number | null;
}

export type TShoppingCard = {
	items: HTMLElement[];
	price: number;
	list: HTMLElement[];
};

export type TShopCardActions = {
	onClick: (event: MouseEvent) => void;
};

export interface IShoppingCardView {
	items: HTMLElement[];
	price: number;
	setOrderButton(value: number): void;
	setOrderIndex(): void;
}



export type TPage = {
	catalog: HTMLElement[];
	locked: boolean;
	cartCounter: TUpdateCounter;
};

export type TUpdateCounter = {
	count: number;
};

export type TPageActions = {
	onClick: (event: MouseEvent) => void;
};

export interface IPageView {
	catalog: HTMLElement[];
	cartCounter: TUpdateCounter;
	locked: boolean;
}

export type TModalData = {
	content: HTMLElement;
};

export interface IModalView {
	content: HTMLElement;
	open(): void;
	close(): void;
	toggleCartBtn(state: boolean): void;
	render(data: TModalData): HTMLElement;
}

export type TFormState = {
	valid: boolean;
	errors: string[];
};

export interface IFormView<T> {
	valid: boolean;
	errors: string;
	render(state: Partial<T> & TFormState): HTMLFormElement;
}

export type TSuccessForm = {
	totalPrice: number;
};

export type TSuccessActions = {
	onClick: () => void;
};

export interface ISuccessView {
	totalPrice: number;
}

export type Url = {
	images: string;
	items: string;
};

