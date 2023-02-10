import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDocentiComponent } from './registro-docenti.component';

describe('RegistroDocentiComponent', () => {
  let component: RegistroDocentiComponent;
  let fixture: ComponentFixture<RegistroDocentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDocentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDocentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
