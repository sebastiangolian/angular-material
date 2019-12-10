import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export class Car {
  id: number;
  name: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly DATA_URL = 'assets/cars.json'

  subject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  current: Car;

  constructor(private httpClient: HttpClient) { }

  getSubject(): BehaviorSubject<Car[]> {
    return this.subject;
  }

  getCurrent() {
    return this.current;
  }

  getAll(): void {
    this.httpClient.get<Car[]>(this.DATA_URL).subscribe(
      (data) => this.subject.next(data),
      (error: HttpErrorResponse) => console.error(error.name + ' ' + error.message)
    );
  }

  add(car: Car): void {
    this.current = car;
  }

  update(car: Car): void {
    this.current = car;
  }

  delete(car: Car): void {
    this.current = null
  }
}
