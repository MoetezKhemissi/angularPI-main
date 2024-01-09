import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { bookConsultationComponent } from './bookConsultation';

describe('bookConsultation', () => {
  let component: bookConsultationComponent;
  let fixture: ComponentFixture<bookConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bookConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bookConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
