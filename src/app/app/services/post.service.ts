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

  posts: Post[]
  private nextId = 0
  private subject = new BehaviorSubject<Post[]>([]);

  constructor(public http: HttpClient) {
    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
    for (const post of this.posts) {
      if (post.id >= this.nextId) this.nextId = post.id + 1;
    }
    this._update();
  }

  add(title: string, body: string, image: string): Post {
    const post = {id: this.nextId++, title, body, image};
    this.posts.push(post);
    this._update();
    console.log(this.posts)
    return post;
  }

  private _update() {
    localStorage.setItem('notes', JSON.stringify(this.posts));
    this.subject.next(this.posts.map(
      post => ({ id: post.id, title: post.title, body: post.body, image: post.image })
    ));
  }
}
