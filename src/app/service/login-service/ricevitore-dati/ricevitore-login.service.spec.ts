import { TestBed } from '@angular/core/testing';

import { RicevitoreLoginService } from './ricevitore-login.service';

describe('RicevitoreLoginService', () => {
  let service: RicevitoreLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicevitoreLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
