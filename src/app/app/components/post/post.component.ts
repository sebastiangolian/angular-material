import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../services/post.service';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private service:PostService) { }

  ngOnInit() {
    //this.service.create({userId:1,id:101,title: "title", body: "body"}).subscribe(val => console.info(val))
    this.service.get().subscribe((posts:Post[]) => console.info(posts))
    //this.service.update({userId:1,id:101,title: "title1", body: "body1"}).subscribe((post:Post) => console.info(post))
    //this.service.getOne(5).subscribe((post:Post) => console.info(post))
    //this.service.getOne(1).subscribe((post:Post) => console.info(post))
    this.service.get(1,20).subscribe((posts:Post[]) => console.info(posts))
    this.service.get(0,0,"desc","title").subscribe((posts:Post[]) => console.info(posts))
  }

}
