import { TestBed } from '@angular/core/testing';

import { RegistroService } from '../service-dati/registro.service';

describe('RegistroService', () => {
  let service: RegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
