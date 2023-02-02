import { TestBed } from '@angular/core/testing';

import { RicevitoreClasseService } from './ricevitore-classe.service';

describe('RicevitoreClasseService', () => {
  let service: RicevitoreClasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreClasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
