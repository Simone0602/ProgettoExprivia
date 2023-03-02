import { TestBed } from '@angular/core/testing';

import { RicevitoreSegreteriaService } from './ricevitore-segreteria.service';

describe('RicevitoreSegreteriaService', () => {
  let service: RicevitoreSegreteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreSegreteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
