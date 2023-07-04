import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavibarLoginComponent } from './navibar-login.component';

describe('NavibarLoginComponent', () => {
  let component: NavibarLoginComponent;
  let fixture: ComponentFixture<NavibarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavibarLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavibarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
