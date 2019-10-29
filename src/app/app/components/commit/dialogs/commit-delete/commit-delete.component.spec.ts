import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitDeleteComponent } from './commit-delete.component';

describe('CommitDeleteComponent', () => {
  let component: CommitDeleteComponent;
  let fixture: ComponentFixture<CommitDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
