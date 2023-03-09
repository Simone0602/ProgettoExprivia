import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiAnagraficiStudenteComponent } from './dati-anagrafici-studente.component';

describe('DatiAnagraficiStudenteComponent', () => {
  let component: DatiAnagraficiStudenteComponent;
  let fixture: ComponentFixture<DatiAnagraficiStudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatiAnagraficiStudenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatiAnagraficiStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
