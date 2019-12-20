import { TestBed } from '@angular/core/testing';

import { FightersService } from './fighters.service';

describe('FightersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FightersService = TestBed.get(FightersService);
    expect(service).toBeTruthy();
  });
});
