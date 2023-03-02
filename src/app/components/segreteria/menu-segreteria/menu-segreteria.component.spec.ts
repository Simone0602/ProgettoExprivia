import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSegreteriaComponent } from './menu-segreteria.component';

describe('MenuSegreteriaComponent', () => {
  let component: MenuSegreteriaComponent;
  let fixture: ComponentFixture<MenuSegreteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSegreteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSegreteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
