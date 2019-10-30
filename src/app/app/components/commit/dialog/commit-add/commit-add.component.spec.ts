import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitAddComponent } from './commit-add.component';

describe('CommitAddComponent', () => {
  let component: CommitAddComponent;
  let fixture: ComponentFixture<CommitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
