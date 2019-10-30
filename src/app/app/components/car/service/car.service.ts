import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

export class Car {
  name: string;
  color: string;
}


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly API_URL = 'https://api.github.com/repos/sebastiangolian/angular-material/commits';

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
    this.httpClient.get<Car[]>(this.API_URL).subscribe(
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
    console.log(id);
  }
}
