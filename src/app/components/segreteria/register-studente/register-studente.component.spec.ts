import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudenteComponent } from './register-studente.component';

describe('RegisterStudenteComponent', () => {
  let component: RegisterStudenteComponent;
  let fixture: ComponentFixture<RegisterStudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterStudenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
