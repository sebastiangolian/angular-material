import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOneSideComponent } from './car-one-side.component';

describe('CarOneSideComponent', () => {
  let component: CarOneSideComponent;
  let fixture: ComponentFixture<CarOneSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarOneSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOneSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
