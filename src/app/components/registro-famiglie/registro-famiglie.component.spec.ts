import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFamiglieComponent } from './registro-famiglie.component';

describe('RegistroFamiglieComponent', () => {
  let component: RegistroFamiglieComponent;
  let fixture: ComponentFixture<RegistroFamiglieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFamiglieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFamiglieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
