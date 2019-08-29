import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[]

  constructor(public http: HttpClient) { 
    this.fetchMovies().then(data => this.posts = data)
  }

  fetchMovies()  {
    return <Promise<Post[]>> this.http.get('assets/movies.json').toPromise();
  }
}
