import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Post, PostService } from './service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts = new BehaviorSubject<Post[]>([]);
  currentItem: Post = { id: -1, title: '', description: '', image: '' };
  isCreate = false;
  isEdit = false;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.postService.subscribe(this.posts);
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSelect(id: number) {
    this.currentItem = this.postService.get(id);
  }

  isSelected(): boolean {
    return this.currentItem.id >= 0;
  }

  onAdd() {
    this.formGroup.reset();
    this.isCreate = true;
    this.isEdit = true;
  }

  onEdit() {
    if (this.currentItem.id < 0) return;
    this.formGroup.get('title').setValue(this.currentItem.title);
    this.formGroup.get('description').setValue(this.currentItem.description);
    this.formGroup.get('image').setValue(this.currentItem.image);
    this.isCreate = false;
    this.isEdit = true;
  }

  onDelete() {
    if (this.currentItem.id < 0) return;
    this.postService.delete(this.currentItem.id);
    this.currentItem = { id: -1, title: '', description: '', image: '' };
    this.isEdit = false;
  }

  onUpdate() {
    if (!this.formGroup.valid) return;
    const title = this.formGroup.get('title').value;
    const description = this.formGroup.get('description').value;
    const image = this.formGroup.get('image').value;
    if (this.isCreate) {
      this.currentItem = this.postService.add(title, description, image);
    } else {
      const id = this.currentItem.id;
      this.postService.update(id, title, description, image);
      this.currentItem = { id, title, description, image };
    }
    this.isEdit = false;
  }

  onCancel() {
    this.currentItem = { id: -1, title: '', description: '', image: '' };
    this.isEdit = false;
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