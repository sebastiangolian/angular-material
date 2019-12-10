import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../../car/service/car.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarOneSideService {

  private readonly DATA_URL = 'assets/cars.json'

  subject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  current: Car;

  constructor(private httpClient: HttpClient) { }

  getSubject(): BehaviorSubject<Car[]> {
    return this.subject
  }

  getAll(): void {
    this.httpClient.get<Car[]>(this.DATA_URL).subscribe(
      (data) => this.subject.next(data),
      (error: HttpErrorResponse) => console.error(error.name + ' ' + error.message)
    );
  }

  add(car: Car): void {
    car.id = this.subject.value[this.subject.value.length-1].id + 1;
    this.subject.value.push(car);
  }

  update(car: Car): void {
    const foundIndex = this.subject.value.findIndex(x => x.id === car.id);
    this.subject.value[foundIndex] = car;
  }

  delete(car: Car): void {
    const foundIndex = this.subject.value.findIndex(x => x.id === car.id);
    this.subject.value.splice(foundIndex, 1);
  }
}
