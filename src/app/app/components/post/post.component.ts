import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post, PostService } from '../../services/post.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts = new BehaviorSubject<Post[]>([]);
  currentPost: Post = { id: -1, title: '', description: '', image: '' };
  createPost = false;
  editPost = false;
  editPostForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.postService.subscribe(this.posts);
    this.editPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSelect(id: number) {
    this.currentPost = this.postService.get(id);
  }

  isSelected(): boolean {
    return this.currentPost.id >= 0;
  }

  onAdd() {
    this.editPostForm.reset();
    this.createPost = true;
    this.editPost = true;
  }

  onEdit() {
    if (this.currentPost.id < 0) return;
    this.editPostForm.get('title').setValue(this.currentPost.title);
    this.editPostForm.get('description').setValue(this.currentPost.description);
    this.editPostForm.get('image').setValue(this.currentPost.image);
    this.createPost = false;
    this.editPost = true;
  }

  onDelete() {
    if (this.currentPost.id < 0) return;
    this.postService.delete(this.currentPost.id);
    this.currentPost = { id: -1, title: '', description: '', image: '' };
    this.editPost = false;
  }

  onUpdate() {
    if (!this.editPostForm.valid) return;
    const title = this.editPostForm.get('title').value;
    const description = this.editPostForm.get('description').value;
    const image = this.editPostForm.get('image').value;
    if (this.createPost) {
      this.currentPost = this.postService.add(title, description, image);
    } else {
      const id = this.currentPost.id;
      this.postService.update(id, title, description, image);
      this.currentPost = { id, title, description, image };
    }
    this.editPost = false;
  }

  onCancel() {
    this.currentPost = { id: -1, title: '', description: '', image: '' };
    this.editPost = false;
  }

  onFilter(filterValue: string) {
    this.postService.setFilter(filterValue)
    this.postService.subscribe(this.posts);
  }

  onSort(sort: Sort) {
    this.postService.setSort(sort)
    this.postService.subscribe(this.posts);
  }
}