import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoClassiComponent } from './elenco-classi.component';

describe('ElencoClassiComponent', () => {
  let component: ElencoClassiComponent;
  let fixture: ComponentFixture<ElencoClassiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoClassiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencoClassiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
