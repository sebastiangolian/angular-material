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

  it('should deleteAll', () => {
    postService.deleteAll()
    expect(postService.getAll().length).toEqual(0);
  });

  it('should allow add', () => {
    postService.deleteAll()
    postService.add('title', 'description', 'image')
    expect(postService.getAll().length).toEqual(1);
  });

  it('should allow get', () => {
    postService.deleteAll()
    postService.add('title', 'description', 'image')
    expect(postService.get(0).title).toEqual('title')
  });

  it('should allow update', () => {
    postService.deleteAll()
    postService.add('title', 'description', 'image')
    postService.update(0, 'title-update', 'description-update', 'image-update')
    expect(postService.get(0).title).toEqual('title-update')
  });

  it('should allow delete', () => {
    postService.deleteAll()
    postService.add('title', 'description', 'image')
    expect(postService.getAll().length).toEqual(1);
    postService.delete(0)
    expect(postService.getAll().length).toEqual(0);
  });
});
