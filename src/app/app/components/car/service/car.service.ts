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
    let nextId = this.getSubject().value[this.getSubject().value.length-1].id + 1;
    car.id = nextId
    this.getSubject().value.push(car);
  }

  update(car: Car): void {
    const foundIndex = this.getSubject().value.findIndex(x => x.id === car.id);
    this.getSubject().value[foundIndex] = car;
    this.getSubject().value[foundIndex].id = car.id;
  }

  delete(car: Car): void {
    const foundIndex = this.getSubject().value.findIndex(x => x.id === car.id);
    this.getSubject().value.splice(foundIndex, 1);
  }
}
