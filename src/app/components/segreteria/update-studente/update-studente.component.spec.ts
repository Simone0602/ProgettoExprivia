import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudenteComponent } from './update-studente.component';

describe('UpdateStudenteComponent', () => {
  let component: UpdateStudenteComponent;
  let fixture: ComponentFixture<UpdateStudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
