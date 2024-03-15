export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface ICardItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number | null;
}

export interface ICardList {
  total: number;
  items: ICardItem[];
}

export type ICards = ICardItem & ICardList;

export type IBasketItem = Pick<ICards, 'id' | 'total'> & {
  isMyOrder: boolean
};

export interface IAppState {
  catalog: ICards[];
  basket: string[];
  preview: string | null;
  order: IOrderForm | null;
  loading: boolean;
}

export interface IOrderForm {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number | null;
}

export interface IOrder extends IOrderForm {
  items: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
  id: string;
  total: number | null;
}