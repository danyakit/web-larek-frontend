# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных

Проект "Веб-ларек" следует принципам модульности и четкого разделения ответственности компонентов. Класс WebLarek выступает в роли контроллера, управляющего всей бизнес-логикой, взаимодействуя с различными частями системы, такими как товары, корзина и заказы. Типы и интерфейсы обеспечивают строгую типизацию данных, что улучшает понимание и поддержку кода.


### 1. Класс WebLarek
#### 1.1. Основная функциональность
Описание: WebLarek представляет собой главный класс, объединяющий бизнес-логику проекта.
Ответственность: Управление товарами, корзиной, заказами, взаимодействие с API.

#### 1.2. Ключевые методы
getProducts(): ProductViewData

Описание: Возвращает информацию о всех товарах.
Аргументы: Отсутствуют.
getProductDetails(productId: ProductId): ProductDetailsViewData

Описание: Возвращает информацию о конкретном товаре по его идентификатору.
Аргументы: productId - идентификатор товара.
getCartItems(): CartViewData

Описание: Возвращает информацию о текущих элементах корзины.
Аргументы: Отсутствуют.
addToCart(productId: ProductId, quantity: number): void

Описание: Добавляет товар в корзину с указанным количеством и эмитирует событие изменения корзины.
Аргументы: productId - идентификатор товара, quantity - количество товара.

#### 1.3. Взаимодействие с Другими Компонентами
EventEmitter

Описание: WebLarek взаимодействует с EventEmitter для эмитирования событий, таких как изменение деталей продукта.
ApiService

Описание: WebLarek использует ApiService для взаимодействия с сервером, загрузки деталей продукта и размещения заказов.

#### 2. Типы и Интерфейсы
2.1. Типы Данных
ProductId

Описание: Тип для идентификатора товара.
Product

Описание: Интерфейс, представляющий структуру товара.
CartItem

Описание: Интерфейс, описывающий элемент корзины.
ProductViewData

Описание: Интерфейс, содержащий массив товаров для представления списка товаров.
ProductDetailsViewData

Описание: Интерфейс, содержащий информацию о конкретном товаре.
CartViewData

Описание: Интерфейс, содержащий массив элементов корзины для представления корзины.
OrderInfoViewData

Описание: Интерфейс, содержащий информацию о заказе.

#### 2.2. События и Эмиттер
EventCallback<T extends keyof Events>

Описание: Тип для функции обратного вызова событий.
Events

Описание: Тип данных для определения различных событий.
EventEmitter

Описание: Интерфейс для эмиттера событий.

#### 2.3. Служба API
ApiService
Описание: Интерфейс, предоставляющий методы для взаимодействия с сервером.

#### 2.4. Типы Деталей Заказа
OrderDetails

Описание: Интерфейс, содержащий информацию для размещения заказа.
OrderInfo

Описание: Интерфейс, содержащий информацию о заказе.


### Взаимодействие компонентов
Класс WebLarek использует интерфейсы Product, CartItem, OrderDetails и OrderInfo для обработки данных о товарах, корзине и заказах.
Для взаимодействия с сервером класс WebLarek использует ApiService.
Класс WebLarek эмитирует события с помощью EventEmitter, которые могут быть перехвачены другими компонентами для выполнения соответствующих действий.