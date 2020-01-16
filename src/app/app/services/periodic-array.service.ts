import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodicArrayService {

  private elements: PeriodicElement[];
  private subject: BehaviorSubject<PeriodicElement>;

  private readonly DATA_URL = 'assets/periodic.json'
  
  constructor(public http: HttpClient) {
    this.http.get(this.DATA_URL).toPromise().then((data:PeriodicElement[]) => this.elements = data)
    //this.subject = new BehaviorSubject<PeriodicElement[]>(this.DATA_URL)
  }

  fetchAllArray(): PeriodicElement[] {
    return this.elements;
  }

  fetchAllPromise(): Promise<PeriodicElement[]> {
    return <Promise<PeriodicElement[]>>this.http.get(this.DATA_URL).toPromise();
  }

  fetchAllObservable(): Observable<PeriodicElement[]> {
    return <Observable<PeriodicElement[]>>this.http.get(this.DATA_URL);
  }

  getAll() {

  }

  add() {

  }

  update() {

  }

  delete() {

  }
}
