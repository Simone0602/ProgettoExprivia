import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoDocentiComponent } from './elenco-docenti.component';

describe('ElencoDocentiComponent', () => {
  let component: ElencoDocentiComponent;
  let fixture: ComponentFixture<ElencoDocentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoDocentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencoDocentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
