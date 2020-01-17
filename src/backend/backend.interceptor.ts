import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { BackendModel, BackendInterface } from './backend.core';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        let userBackendModel: UserBackendModel = new UserBackendModel(url, body, method);

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(1))
            .pipe(dematerialize());

        function handleRoute() {
            console.info(url);

            let ret: Observable<HttpEvent<any>> = null

            if (ret == null) ret = userBackendModel.handleRoute();
            if (ret == null) ret = next.handle(request)

            return ret;
        }
    }
}

export const backendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};

export interface CarBackend extends BackendInterface {
    id: number;
    name: string;
    country: string;
}

export interface IssueBackend extends BackendInterface {
    id: number;
    created_at: string;
    number: string;
    state: string;
    title: string;
}

export class UserBackendModel extends BackendModel<CarBackend> {
    storage: CarBackend[] = JSON.parse(localStorage.getItem('cars')) || [];
    resource: string = "cars"
}

export class IssueModel extends BackendModel<IssueBackend> {
    storage: IssueBackend[] = JSON.parse(localStorage.getItem('issues')) || [];
    resource: string = "issues"
}
