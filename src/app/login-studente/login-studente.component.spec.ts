import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStudenteComponent } from './login-studente.component';

describe('LoginStudenteComponent', () => {
  let component: LoginStudenteComponent;
  let fixture: ComponentFixture<LoginStudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginStudenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
