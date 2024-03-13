
// Тип для идентификатора товара
type ProductId = number;

// Интерфейс, представляющий структуру товара
interface Product {
  id: ProductId;
  name: string;
  price: number;
}

// Интерфейс, описывающий элемент корзины
interface CartItem {
  productId: ProductId;
  quantity: number;
}

// Интерфейс, содержащий массив товаров для представления списка товаров
interface ProductViewData {
  products: Product[];
}

// Интерфейс, содержащий информацию о конкретном товаре
interface ProductDetailsViewData {
  product: Product;
}

// Интерфейс, содержащий массив элементов корзины для представления корзины
interface CartViewData {
  cartItems: CartItem[];
}

// Интерфейс, содержащий информацию о заказе
interface OrderInfoViewData {
  order: OrderInfo;
}

// Тип для функции обратного вызова событий
type EventCallback<T extends keyof Events> = (...args: Events[T][]) => void;

// Тип данных для определения различных событий
interface Events {
  PRODUCT_DETAILS_CHANGED: ProductDetailsViewData;
  ORDER_PLACED_SUCCESS: OrderInfoViewData;
  ORDER_PLACED_FAILURE: { error: string };
}

// Интерфейс для эмиттера событий
interface EventEmitter {
  on<E extends keyof Events>(eventName: E, callback: EventCallback<E>): void;
  emit<E extends keyof Events>(eventName: E, ...args: Events[E][]): void;
}

// Интерфейс, предоставляющий методы для взаимодействия с сервером
interface ApiService {
  loadProductDetails: (productId: ProductId) => Promise<Product>;
  placeOrder: (orderDetails: OrderDetails) => Promise<OrderInfo>;
}

// Интерфейс, содержащий информацию, необходимую для размещения заказа
interface OrderDetails {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: ProductId[];
}

// Интерфейс, содержащий информацию о заказе
interface OrderInfo {
  id: string;
  total: number;
  paymentMethod: string;
  email: string;
  phone: string;
  address: string;
  items: ProductId[];
}

// Класс, реализующий бизнес-логику проекта "Веб-ларек"
class WebLarek {
  private products: Product[];
  private cartItems: CartItem[];
  private eventEmitter: EventEmitter;
  private apiService: ApiService;

  constructor(products: Product[], eventEmitter: EventEmitter, apiService: ApiService) {
    this.products = products;
    this.cartItems = [];
    this.eventEmitter = eventEmitter;
    this.apiService = apiService;
  }

  // Метод для получения списка всех товаров
  getProducts(): ProductViewData {
    return { products: this.products };
  }

  // Метод для получения информации о конкретном товаре по его идентификатору
  getProductDetails(productId: ProductId): ProductDetailsViewData {
    const product = this.products.find((p) => p.id === productId);
    return { product };
  }

  // Метод для получения списка элементов корзины
  getCartItems(): CartViewData {
    return { cartItems: this.cartItems };
  }

  // Метод для добавления товара в корзину с указанным количеством
  addToCart(productId: ProductId, quantity: number): void {
    const existingCartItem = this.cartItems.find((item) => item.productId === productId);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity });
    }

    // Эмитируем событие изменения корзины
    this.eventEmitter.emit('PRODUCT_DETAILS_CHANGED', { product: this.getProductDetails(productId) });
  }


}

