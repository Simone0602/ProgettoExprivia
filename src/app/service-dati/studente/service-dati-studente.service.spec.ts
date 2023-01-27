import { TestBed } from '@angular/core/testing';

import { ServiceDatiStudenteService } from './service-dati-studente.service';

describe('ServiceDatiStudenteService', () => {
  let service: ServiceDatiStudenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDatiStudenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
