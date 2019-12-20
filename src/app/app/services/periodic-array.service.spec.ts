import { TestBed } from '@angular/core/testing';

import { PeriodicArrayService } from './periodic-array.service';

describe('PeriodicArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodicArrayService = TestBed.get(PeriodicArrayService);
    expect(service).toBeTruthy();
  });
});
