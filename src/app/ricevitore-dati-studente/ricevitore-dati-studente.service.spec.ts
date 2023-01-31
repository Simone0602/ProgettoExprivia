import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicevitoreDatiStudenteService } from './ricevitore-dati-studente.service';

describe('RicevitoreDatiStudenteComponent', () => {
  let component: RicevitoreDatiStudenteService;
  let fixture: ComponentFixture<RicevitoreDatiStudenteService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RicevitoreDatiStudenteService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RicevitoreDatiStudenteService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
