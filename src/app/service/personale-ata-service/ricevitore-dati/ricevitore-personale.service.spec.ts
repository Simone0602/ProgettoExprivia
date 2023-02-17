import { TestBed } from '@angular/core/testing';

import { RicevitorePersonaleService } from './ricevitore-personale.service';

describe('RicevitorePersonaleService', () => {
  let service: RicevitorePersonaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitorePersonaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
