import { of, throwError, Observable } from 'rxjs'
import { HttpResponse, HttpEvent } from '@angular/common/http'

export interface BackendInterface {
    id: number;
}

export class BackendModel<T extends BackendInterface> {
    storage:T[]
    resource:string
    url:string
    body:any
    method:string

    constructor(url:string, body:any, method:string) {
        this.storage = JSON.parse(localStorage.getItem(this.resource))
        this.url = url
        this.body = body
        this.method = method
    }

    handleRoute(): Observable<HttpEvent<any>> {
        switch (true) {
            case this.url.endsWith(this.resource) && this.method === 'POST':
                return this.create();
            case this.url.endsWith(this.resource) && this.method === 'GET':
                return this.getAll();
            case this.url.includes(this.resource) && this.url.includes("limit") && this.method === 'GET':
                return this.getAll(this.url);
            case this.url.endsWith(this.resource) && this.method === 'DELETE':
                return this.deleteAll();
            case this.url.match(new RegExp("/" + this.resource + "/\\d+$")) && this.method === 'GET':
                return this.get();
            case this.url.match(new RegExp("/" + this.resource + "/\\d+$")) && this.method === 'PUT':
                return this.update();
            case this.url.match(new RegExp("/" + this.resource + "/\\d+$")) && this.method === 'DELETE':
                return this.delete();
            default:
                return null;
        }
    }

    getAll(url?: string): Observable<HttpResponse<T[]>> {
        if(url) {
            let limit: number = Number(url.split('limit=').pop().split('&')[0]);
            let page: number = Number(url.split('page=').pop()[0]);
            let min: number = limit * page;
            let max: number = min + limit;
            let ret:T[] = this.storage.filter((i: T, index: number) => (index >= min && index < max))
            return this.response200(ret);
        }
        else {
            return this.response200(this.storage);
        }
    }

    get(): Observable<HttpResponse<T[]>> {
        let item: T = this.storage.find(x => x.id == this.getIdFromUrl());
        return this.response200([item]);
    }

    create(): Observable<HttpResponse<T[]>> {
        let item = this.body
        if (this.storage.find(x => x.id === item.id)) { return this.response500('Item with id: ' + item.id + ' is already taken') }
        item.id = this.storage.length ? Math.max(...this.storage.map(x => x.id)) + 1 : 1;
        this.storage.push(item);
        localStorage.setItem(this.resource, JSON.stringify(this.storage));
        
        return this.response200(item);
    }

    update(): Observable<HttpResponse<T[]>> {
        let index = this.storage.findIndex(x => x.id == this.getIdFromUrl());
        if(index > -1 ) {
            this.storage[index] = this.body
            localStorage.setItem(this.resource, JSON.stringify(this.storage));
            return this.response200(this.body);
        }
        else {
            return this.response500('Item with id: ' + this.getIdFromUrl() + ' is not exist')
        }
    }

    delete(): Observable<HttpResponse<T[]>> {
        let item = this.storage.filter(x => x.id == this.getIdFromUrl());
        if(item.length == 1) 
        this.storage = this.storage.filter(x => x.id !== this.getIdFromUrl());
        else 
            return this.response500('Item with id: ' + this.getIdFromUrl() + ' is not exist')

        localStorage.setItem(this.resource, JSON.stringify(this.storage));
        return this.response200();
    }

    deleteAll(): Observable<HttpResponse<T[]>> {
        if(this.storage.length < 1) return this.response500('No items to delete')
        this.storage = []
        localStorage.setItem(this.resource, JSON.stringify(this.storage));
        return this.response200();
    }

    response200(body?: T[]): Observable<HttpResponse<T[]>> {
        return of(new HttpResponse<T[]>({ status: 200, body }))
    }

    response500(message: any): Observable<HttpResponse<any>> {
        return throwError({ status: 500, error: { message } });
    }

    getIdFromUrl(): number {
        let urlParts: string[] = this.url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
    }
}