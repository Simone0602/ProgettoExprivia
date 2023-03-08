import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocenteComponent } from './update-docente.component';

describe('UpdateDocenteComponent', () => {
  let component: UpdateDocenteComponent;
  let fixture: ComponentFixture<UpdateDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
