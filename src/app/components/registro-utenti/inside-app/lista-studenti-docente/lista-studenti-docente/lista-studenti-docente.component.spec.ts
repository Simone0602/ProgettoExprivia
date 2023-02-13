import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStudentiDocenteComponent } from './lista-studenti-docente.component';

describe('ListaStudentiDocenteComponent', () => {
  let component: ListaStudentiDocenteComponent;
  let fixture: ComponentFixture<ListaStudentiDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaStudentiDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaStudentiDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
