import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observer } from 'rxjs';

export class Note {
  id: number;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private storageName: string = 'notes'
  private items: Note[] = []
  private nextId = 0
  private subject = new BehaviorSubject<Note[]>([]);

  constructor(public http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem(this.storageName)) || [];
    for (const post of this.items) {
      if (post.id >= this.nextId) this.nextId = post.id + 1;
    }
    this._update();
  }

  subscribe(observer: Observer<Note[]>) {
    this.subject.subscribe(observer);
  }

  add(title: string, text: string): Note {
    const item = {id: this.nextId++, title, text};
    this.items.push(item);
    this._update();
    return item;
  }

  get(id: number): Note {
    const index = this._find(id);
    return this.items[index];
  }

  getAll(): Note[] {
    return this.items;
  }

  update(id: number, title: string, text: string) {
    const index = this._find(id);
    this.items[index] = {id, title, text};
    this._update();
  }

  delete(id: number) {
    const index = this._find(id);
    this.items.splice(index, 1);
    this._update();
  }

  deleteAll(): void {
    this.nextId = 0
    this.items = []
    localStorage.removeItem(this.storageName)
  }

  private _update() {
    localStorage.setItem(this.storageName, JSON.stringify(this.items));
    this.subject.next(this.items.map(
      item => ({ id: item.id, title: item.title, text: item.text})
    ));
  }

  private _find(id: number): number {
    for (let i=0; i<this.items.length; i++) {
      if (this.items[i].id === id) return i;
    }
    throw new Error(`Record with id ${id} was not found!`);
  }
}
