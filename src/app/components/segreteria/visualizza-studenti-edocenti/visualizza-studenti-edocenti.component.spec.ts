import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaStudentiEDocentiComponent } from './visualizza-studenti-edocenti.component';

describe('VisualizzaStudentiEDocentiComponent', () => {
  let component: VisualizzaStudentiEDocentiComponent;
  let fixture: ComponentFixture<VisualizzaStudentiEDocentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizzaStudentiEDocentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaStudentiEDocentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
