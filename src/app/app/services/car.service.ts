import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { Api } from '../interfaces/api.interface';


export class Car implements Item {
  id: number;
  name: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url: string = "http://localhost:4200/cars"; 

  constructor(private http: HttpClient) { }

  get(limit?:number, page?:number, sort?: string, filter?: string): Observable<Api<Car>> {
    let url = this.url + "?sort_by="
    if(sort) url += sort; else url += "id.asc"; 
    if(limit > 0 && page >= 0) url += "&limit=" + limit + "&page=" + page
    if(filter) url += "&filter=" + filter
    return this.http.get<Api<Car>>(url);
  }

  getOne(id: number): Observable<Car> {
    return this.http.get<Car>(this.url + "/" + id);
  }

  create(item: Car): Observable<any> {
    return this.http.post<Car>(this.url, item);
  }

  update(item: Car): Observable<any> {
    return this.http.put<Car>(this.url + "/" + item.id, item);
  }

  delete(item: Car): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.url + "/" + item.id);
  }

  deleteAll(): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.url);
  }
}
