import { of, throwError, Observable } from 'rxjs'
import { HttpResponse, HttpEvent } from '@angular/common/http'

export interface ApiBackend<T extends BackendInterface> {
    total_items: number;
    items: T[];
}

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
            case this.url.includes(this.resource) && this.url.includes("limit") && this.method === 'GET':
                return this.getAll(this.url);
            case this.url.includes(this.resource) && this.url.includes("sort_by") && this.method === 'GET':
                return this.getAll();
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

    getAll(url?: string): Observable<HttpResponse<ApiBackend<T>>> {
        if(url) {
            let sort_by: string = this.getParamFromUrl('sort_by');
            let limit: string = this.getParamFromUrl('limit');
            let page: string = this.getParamFromUrl('page');
            let filter: string = this.getParamFromUrl('filter');
            let ret:T[] = this.storage;
            let totalItemFilter: number;

            if(filter) ret = this.filter(ret,filter);
            totalItemFilter = ret.length

            if(sort_by) ret = this.sort(ret,sort_by);

            if (limit && page) {
                let min: number = Number(limit) * Number(page);
                let max: number = min + Number(limit);
                ret = ret.filter((i: T, index: number) => (index >= min && index < max))
            }
            
            return of(new HttpResponse<ApiBackend<T>>({ status: 200, body: {"total_items": totalItemFilter, "items": ret} }))
        }
        else {
            return of(new HttpResponse<ApiBackend<T>>({ status: 200, body: {"total_items": this.storage.length, "items": this.storage} }))
        }
    }

    get(): Observable<HttpResponse<T[]>> {
        let item: T = this.storage.find(x => x.id == this.getIdFromUrl());
        return this.response200([item]);
    }

    create(): Observable<HttpResponse<T[]>> {
        let item = this.body
        if (this.storage.find(x => x.id === item.id)) { return this.response404('Item with id: ' + item.id + ' is already taken') }
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
            return this.response404('Item with id: ' + this.getIdFromUrl() + ' is not exist')
        }
    }

    delete(): Observable<HttpResponse<T[]>> {
        let item = this.storage.filter(x => x.id == this.getIdFromUrl());
        if(item.length == 1) 
        this.storage = this.storage.filter(x => x.id !== this.getIdFromUrl());
        else 
            return this.response404('Item with id: ' + this.getIdFromUrl() + ' is not exist')

        localStorage.setItem(this.resource, JSON.stringify(this.storage));
        return this.response204();
    }

    deleteAll(): Observable<HttpResponse<T[]>> {
        if(this.storage.length < 1) return this.response404('No items to delete')
        this.storage = []
        localStorage.setItem(this.resource, JSON.stringify(this.storage));
        return this.response200();
    }

    response200(body?: T[]): Observable<HttpResponse<T[]>> {
        return of(new HttpResponse<T[]>({ status: 200, body }))
    }

    response204(body?: T[]): Observable<HttpResponse<T[]>> {
        return of(new HttpResponse<T[]>({ status: 204, body }))
    }

    response404(message: any): Observable<HttpResponse<any>> {
        return throwError({ status: 404, error: { message } });
    }

    private getIdFromUrl(): number {
        let urlParts: string[] = this.url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
    }

    private getParamFromUrl(name: string): string {
        let param = name + "=";
        let urlSplit = this.url.split(param)

        if(urlSplit.length > 1) {
            return urlSplit[1].split("&")[0]
        } else {
            return ""
        }
    }

    private sort(data: T[], sort: string): T[] {
        let sort_name = sort.split('.')[0]
        let sort_direction = sort.split('.')[1]

        if(sort == "" || sort_name == "" || sort_direction == "" ) {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            [propertyA, propertyB] = [a[sort_name], b[sort_name]]; 

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (sort_direction === 'asc' ? 1 : -1);
        });
    }

    private filter(data: T[], filter: string): T[] {
        if(filter == "" ) {
            return data;
        }

        return data.filter((i) => {
            let values = Object.values(i).filter(value => {
                if(typeof value == "string") {
                    return value.toLowerCase().includes(filter.toLowerCase())
                } 
            })

            if(values.length > 0) return true
        });
    }
}