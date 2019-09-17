import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observer } from 'rxjs';
import { Posts } from 'src/app/app/data/post.data';

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private storageName: string = 'posts'
  private items: Post[] = []
  private nextId = 0
  private subject = new BehaviorSubject<Post[]>([]);

  constructor(public http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem(this.storageName)) || [];
    for (const post of this.items) {
      if (post.id >= this.nextId) this.nextId = post.id + 1;
    }

    if(this.items.length == 0) {
      this.fillFromFile()
    }

    this._update();
  }

  subscribe(observer: Observer<Post[]>) {
    this.subject.subscribe(observer);
  }

  fillFromFile(): void {
    let posts: Array<Post> = Posts
    this.items = posts
  }

  add(title: string, description: string, image: string): Post {
    const post = {id: this.nextId++, title, description, image};
    this.items.push(post);
    this._update();
    return post;
  }

  get(id: number): Post {
    const index = this._find(id);
    return this.items[index];
  }

  getAll(): Post[] {
    return this.items;
  }

  update(id: number, title: string, description: string, image: string) {
    const index = this._find(id);
    this.items[index] = {id, title, description, image};
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

  setFilter(filter: string): void {
    this.items = JSON.parse(localStorage.getItem(this.storageName)) || [];
    this.items = this.items.filter(post => (post.title.indexOf(filter) > -1 || post.description.indexOf(filter) > -1))
    this.subject.next(this.items.map(
      post => ({ id: post.id, title: post.title, description: post.description, image: post.image })
    ));
  }

  private _update() {
    localStorage.setItem(this.storageName, JSON.stringify(this.items));
    this.subject.next(this.items.map(
      post => ({ id: post.id, title: post.title, description: post.description, image: post.image })
    ));
  }

  private _find(id: number): number {
    for (let i=0; i<this.items.length; i++) {
      if (this.items[i].id === id) return i;
    }
    throw new Error(`Record with id ${id} was not found!`);
  }
}
