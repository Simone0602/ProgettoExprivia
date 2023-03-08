import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiAnagraficiDocenteComponent } from './dati-anagrafici-docente.component';

describe('DatiAnagraficiDocenteComponent', () => {
  let component: DatiAnagraficiDocenteComponent;
  let fixture: ComponentFixture<DatiAnagraficiDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatiAnagraficiDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatiAnagraficiDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
