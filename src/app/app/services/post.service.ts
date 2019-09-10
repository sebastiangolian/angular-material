import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private storageName: string = 'posts'
  private items: Post[]
  private nextId = 0
  private subject = new BehaviorSubject<Post[]>([]);

  constructor(public http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem(this.storageName)) || [];
    for (const post of this.items) {
      if (post.id >= this.nextId) this.nextId = post.id + 1;
    }
    this._update();
  }

  add(title: string, body: string, image: string): Promise<Post> {
    const post = {id: this.nextId++, title, body, image};
    this.items.push(post);
    this._update();
    return Promise.resolve(post);
  }

  get(id: number): Post {
    const index = this._find(id);
    return this.items[index];
  }

  getAll(): Post[] {
    return JSON.parse(localStorage.getItem(this.storageName)) || [];
  }

  update(id: number, title: string, body: string, image: string) {
    const index = this._find(id);
    this.items[index] = {id, title, body, image};
    this._update();
  }

  delete(id: number) {
    const index = this._find(id);
    this.items.splice(index, 1);
    this._update();
  }

  deleteAll(): void {
    localStorage.removeItem(this.storageName)
  }

  private _update() {
    localStorage.setItem(this.storageName, JSON.stringify(this.items));
    this.subject.next(this.items.map(
      post => ({ id: post.id, title: post.title, body: post.body, image: post.image })
    ));
  }

  private _find(id: number): number {
    for (let i=0; i<this.items.length; i++) {
      if (this.items[i].id === id) return i;
    }
    throw new Error(`Record with id ${id} was not found!`);
  }
}
