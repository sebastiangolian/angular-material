import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightersComponent } from './fighters.component';

describe('FightersComponent', () => {
  let component: FightersComponent;
  let fixture: ComponentFixture<FightersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
