import { TestBed } from '@angular/core/testing';

import { ServiceDatiDocenteService } from './service-dati-docente.service';

describe('ServiceDatiDocenteService', () => {
  let service: ServiceDatiDocenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDatiDocenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
