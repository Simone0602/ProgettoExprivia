import { TestBed } from '@angular/core/testing';

import { RicevitoreRegistroService } from './ricevitore-registro.service';

describe('RicevitoreRegistroService', () => {
  let service: RicevitoreRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
