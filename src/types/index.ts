// товар
type ProductId = number;

interface Product {
  id: ProductId;
  name: string;
  price: number;
  // Другие свойства товара
}

// элемент корзины
interface CartItem {
    productId: ProductId;
    quantity: number;
    // Другие свойства элемента корзины
  }

  // данные для представления списка товаров
interface ProductViewData {
    products: Product[];
  }

  // данные для представления деталей продукта
interface ProductDetailsViewData {
    product: Product;
}

  // данные для представления корзины
interface CartViewData {
    cartItems: CartItem[];
  }

  // данные для представления формы оформления заказа
interface OrderFormViewData {
    // Дополнительные типы данных для формы оформления заказа
  }

  // данные для представления информации о заказе
interface OrderInfoViewData {
    order: OrderInfo; 
}
  
  // события и эммитер
type EventCallback<T extends keyof Events> = (...args: Events[T][]) => void;

interface Events {
    PRODUCT_DETAILS_CHANGED: ProductDetailsViewData;
    ORDER_PLACED_SUCCESS: OrderInfoViewData;
    ORDER_PLACED_FAILURE: { error: string };
}

interface EventEmitter {
    on<E extends keyof Events>(eventName: E, callback: EventCallback<E>): void;
    emit<E extends keyof Events>(eventName: E, ...args: Events[E][]): void;
}

interface ApiService {
    loadProductDetails: (productId: ProductId) => Promise<Product>;
    placeOrder: (orderDetails: OrderDetails) => Promise<OrderInfo>;
}

// тип данных для деталей заказа
interface OrderDetails {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: ProductId[];
}

interface OrderInfo {
    id: string; // Идентификатор заказа
    total: number; // Общая стоимость заказа
    paymentMethod: string; // Метод оплаты (например, "online")
    email: string; // Email клиента
    phone: string; // Телефон клиента
    address: string; // Адрес доставки
    items: ProductId[]; // Массив идентификаторов товаров в заказе
}


  

  