import { TestBed } from '@angular/core/testing';

import { RicevitoreStudenteService } from './ricevitore-studente.service';

describe('RicevitoreStudenteService', () => {
  let service: RicevitoreStudenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreStudenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
