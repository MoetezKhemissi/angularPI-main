import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConsultantComponent } from './profileConsultant.component';

describe('ProfileComponent', () => {
  let component: ProfileConsultantComponent;
  let fixture: ComponentFixture<ProfileConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
