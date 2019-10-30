import { Injectable } from '@angular/core';
import { Cars } from '../data/car.data';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observer } from 'rxjs';

export interface Car {
  id: number;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private storageName: string = 'cars'
  private items: Car[] = []
  private nextId = 0
  public subject = new BehaviorSubject<Car[]>([]);

  constructor(public http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem(this.storageName)) || [];
    for (const item of this.items) {
      if (item.id >= this.nextId) this.nextId = item.id + 1;
    }

    if (this.items.length == 0) {
      this.items = Cars
    }

    this._update();
  }

  get data(): Car[] {
    return this.subject.value;
  }

  subscribe(observer: Observer<Car[]>) {
    this.subject.subscribe(observer);
  }

  get(id: number): Car {
    const index = this._find(id);
    return this.items[index];
  }

  getAll(): Car[] {
    return this.items;
  }

  add(name: string, color: string): Car {
    const item = { id: this.nextId++, name, color };
    this.items.push(item);
    this._update();
    return item;
  }

  update(id: number, name: string, color: string) {
    const index = this._find(id);
    this.items[index] = { id, name, color };
    this._update();
  }

  delete(id: number) {
    const index = this._find(id);
    this.items.splice(index, 1);
    this._update();
  }

  private _update() {
    localStorage.setItem(this.storageName, JSON.stringify(this.items));
    this.subject.next(this.items.map(
      item => ({ id: item.id, name: item.name, color: item.color})
    ));
  }

  private _find(id: number): number {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) return i;
    }
    throw new Error(`Record with id ${id} was not found!`);
  }
}
