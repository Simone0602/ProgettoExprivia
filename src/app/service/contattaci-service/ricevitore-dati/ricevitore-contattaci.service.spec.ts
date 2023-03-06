import { TestBed } from '@angular/core/testing';

import { RicevitoreContattaciService } from './ricevitore-contattaci.service';

describe('RicevitoreContattaciService', () => {
  let service: RicevitoreContattaciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreContattaciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
