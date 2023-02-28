import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssenzeComponent } from './assenze.component';

describe('AssenzeComponent', () => {
  let component: AssenzeComponent;
  let fixture: ComponentFixture<AssenzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssenzeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
