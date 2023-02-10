import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFamigliaComponent } from './registro-famiglia.component';

describe('RegistroFamigliaComponent', () => {
  let component: RegistroFamigliaComponent;
  let fixture: ComponentFixture<RegistroFamigliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFamigliaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFamigliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
