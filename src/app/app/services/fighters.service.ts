import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FightersService {

  fighters: Array<any> = [
    { name: 'Conor McGregor', wins: 21, losses: 3 },
    { name: 'Tony Ferguson', wins: 23, losses: 3 },
    { name: 'Max Holloway', wins: 19, losses: 3 },
    { name: 'Jon Jones', wins: 22, losses: 1 },
    { name: 'Daniel Cormier', wins: 21, losses: 1 },
    { name: 'Brock Lesnar', wins: 5, losses: 3 }
  ];

  constructor() { }

  get(): Observable<any> {
    return of(this.fighters);
  }

  add() {
    this.fighters.push({ name: 'Janusz', wins: 21, losses: 3 })
  }

  update() {
    this.fighters[1] = { name: 'Janusz', wins: 21, losses: 3 }
  }

  delete() {
    this.fighters.pop()
  }
}