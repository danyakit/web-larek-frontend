import { Api, ApiListResponse, ApiPostMethods } from './base/Api';
import {IOrder, IOrderResult, ICatalogItem, Url,} from "../types";

export interface ILarekAPI extends Api {
	url: Url;
    getCatalogList: () => Promise<ICatalogItem[]>;
    orderItems: (order: IOrder) => Promise<IOrderResult>;
}

export class LarekAPI extends Api implements ILarekAPI {
	url: Url;
    constructor(url: Url, options: RequestInit = {}) {
        super(url, options);
		this.url = url;
    }

    getCatalogList(): Promise<ICatalogItem[]> {
        return this.get('/product/').then((data: ApiListResponse<ICatalogItem>) => {
            return data.items.map((item) => ({
                ...item,
                image: this.url.images + item.image,
            }));
        });
    }

    orderItems(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then((data: IOrderResult) => data);
    }
}
