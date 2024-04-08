import { Url } from "../../types";

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    protected readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: Url, options: RequestInit = {}) {
        if (typeof baseUrl === 'string') {
            this.baseUrl = baseUrl;
        } else {
            this.baseUrl = baseUrl.items; 
        }
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    protected _request(uri: string, method: string, data?: object) {
        const requestOptions: RequestInit = {
            ...this.options,
            method,
            body: data ? JSON.stringify(data) : undefined
        };
        return fetch(this.baseUrl + uri, requestOptions)
            .then(this.handleResponse);
    }

    get(uri: string) {
        return this._request(uri, 'GET');
    }

    post(uri: string, data: object) {
        return this._request(uri, 'POST', data);
    }

    put(uri: string, data: object) {
        return this._request(uri, 'PUT', data);
    }

    delete(uri: string) {
        return this._request(uri, 'DELETE');
    }
}
