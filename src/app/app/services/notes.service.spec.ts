import { TestBed, inject } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { HttpClientModule } from '@angular/common/http';

describe('NotesService', () => {
  var notesService: NotesService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotesService
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  beforeEach(inject([NotesService],
    (service: NotesService) => {
      notesService = service;
    }));

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });

  it('should deleteAll', () => {
    notesService.deleteAll()
    expect(notesService.getAll().length).toEqual(0);
  });

  it('should allow add', () => {
    notesService.deleteAll()
    notesService.add('title', 'text')
    expect(notesService.getAll().length).toEqual(1);
  });

  it('should allow get', () => {
    notesService.deleteAll()
    notesService.add('title', 'text')
    expect(notesService.get(0).title).toEqual('title')
  });

  it('should allow update', () => {
    notesService.deleteAll()
    notesService.add('title', 'text')
    notesService.update(0, 'title-update', 'text-update')
    expect(notesService.get(0).title).toEqual('title-update')
  });

  it('should allow delete', () => {
    notesService.deleteAll()
    notesService.add('title', 'text')
    expect(notesService.getAll().length).toEqual(1);
    notesService.delete(0)
    expect(notesService.getAll().length).toEqual(0);
  });
});