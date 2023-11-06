import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginlayoutComponent } from './loginlayout.component';

describe('LoginlayoutComponent', () => {
  let component: LoginlayoutComponent;
  let fixture: ComponentFixture<LoginlayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginlayoutComponent]
    });
    fixture = TestBed.createComponent(LoginlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
