import { TestBed } from '@angular/core/testing';

import { SegreteriaService } from './segreteria.service';

describe('SegreteriaService', () => {
  let service: SegreteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegreteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
