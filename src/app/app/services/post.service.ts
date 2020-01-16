import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = "https://jsonplaceholder.typicode.com/posts/";

  constructor(private http: HttpClient) { }

  get(page:number=0,limit:number=0,order:string="asc",sort?:string): Observable<Post[]> {
    let url = this.url.slice(0, -1) + "?page=" + page;
    if(limit > 0) url += "&_limit=" + limit;
    if(sort && order) url += "&_sort=" + sort +"&_order=" + order;
    return this.http.get<Post[]>(url);
  }

  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + id);
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(this.url + post.id, post);
  }

  delete(id: number): Observable<Post> {
    return this.http.delete<Post>(this.url + id);
  }
}
