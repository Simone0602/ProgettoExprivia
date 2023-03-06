import { TestBed } from '@angular/core/testing';

import { ContattaciService } from './contattaci.service';

describe('ContattaciServiceService', () => {
  let service: ContattaciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContattaciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
