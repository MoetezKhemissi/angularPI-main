import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSmsComponent } from './reset-password-sms.component';

describe('ResetPasswordSmsComponent', () => {
  let component: ResetPasswordSmsComponent;
  let fixture: ComponentFixture<ResetPasswordSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
