import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export class Car {
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly DATA_URL = 'assets/cars.json'

  dataChange: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): Car[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAll(): void {
    this.httpClient.get<Car[]>(this.DATA_URL).subscribe(
      (data) => this.dataChange.next(data),
      (error: HttpErrorResponse) => console.log(error.name + ' ' + error.message)
    );
  }

  add(car: Car): void {
    this.dialogData = car;
  }

  update(car: Car): void {
    this.dialogData = car;
  }

  delete(id: number): void {

  }
}
