import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Car {
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

  get(limit?:number, page?:number): Observable<Car[]> {
    let url = this.url
    if(limit && page) url = "?limit=" + limit + "&page=" + page
    return this.http.get<Car[]>(url);
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
