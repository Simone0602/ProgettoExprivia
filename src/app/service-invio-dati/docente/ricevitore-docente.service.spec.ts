import { TestBed } from '@angular/core/testing';

import { RicevitoreDocenteService } from './ricevitore-docente.service';

describe('RicevitoreDocenteService', () => {
  let service: RicevitoreDocenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreDocenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
