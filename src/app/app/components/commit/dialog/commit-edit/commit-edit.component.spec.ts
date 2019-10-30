import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitEditComponent } from './commit-edit.component';

describe('CommitEditComponent', () => {
  let component: CommitEditComponent;
  let fixture: ComponentFixture<CommitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
