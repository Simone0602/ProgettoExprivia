import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDocenteComponent } from './register-docente.component';

describe('RegisterDocenteComponent', () => {
  let component: RegisterDocenteComponent;
  let fixture: ComponentFixture<RegisterDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
