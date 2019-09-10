import { TestBed, inject, async } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';

describe('PostService', () => {
  var postService: PostService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostService
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  beforeEach(inject([PostService],
    (service: PostService) => {
      postService = service;
    }));

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });

  it('should deleteAll', async(() => {
    Promise.resolve()
      .then(() => {
        postService.deleteAll()
      })
      .then(() => {
        expect(postService.getAll().length).toEqual(0);
      })
  }));


  it('should allow add', async(() => {
    Promise.resolve()
      .then(() => {
        postService.add('title', 'body', 'image')
      })
      .then(() => {
        expect(postService.getAll().length).toEqual(1);
      })
  }));

  it('should allow get', async(() => {
    expect(postService.get(0).title).toEqual('title')
  }));

  // it('should allow update', async(() => {
  //   Promise.resolve()
  //     .then(() => {
  //       postService.update(0, 'title-update', 'body-update', 'image-update')
  //     })
  //     .then(() => {
  //       expect(postService.get(1).title).toEqual('title-update')
  //     })
  // }));
});
