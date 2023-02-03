import { TestBed } from '@angular/core/testing';

import { ServiceDatiCalsseService } from './service-dati-classe.service';

describe('ServiceDatiCalsseService', () => {
  let service: ServiceDatiCalsseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDatiCalsseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
