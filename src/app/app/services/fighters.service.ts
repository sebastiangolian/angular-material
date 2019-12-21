import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Fighter } from '../components/fighters/fighter';

@Injectable({
  providedIn: 'root'
})
export class FightersService {

  fighters: Array<Fighter> = [
    { id: 1, name: 'Conor McGregor', wins: 21, losses: 3 },
    { id: 2, name: 'Tony Ferguson', wins: 23, losses: 3 },
    { id: 3, name: 'Max Holloway', wins: 19, losses: 3 },
    { id: 4, name: 'Jon Jones', wins: 22, losses: 1 },
    { id: 5, name: 'Daniel Cormier', wins: 21, losses: 1 },
    { id: 6, name: 'Brock Lesnar', wins: 5, losses: 3 }
  ];

  constructor() { }

  get(): Observable<Fighter[]> {
    return of(this.fighters);
  }

  add(fighter: Fighter): Observable<Fighter> {
    this.fighters.push(fighter)
    return of(fighter)
  }

  update(fighter: Fighter): Observable<Fighter> {
    let index = this.fighters.findIndex((f:Fighter) => {return f.id == fighter.id})
    this.fighters[index] = fighter
    return of(fighter)
  }

  delete(fighter: Fighter): Observable<Fighter> {
    this.fighters.forEach( (item, index) => {
      if(item.id === fighter.id) this.fighters.splice(index,1);
    });
    return of(fighter)
  }
}