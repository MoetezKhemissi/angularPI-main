import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestesmentsComponent } from './investesments.component';

describe('InvestesmentsComponent', () => {
  let component: InvestesmentsComponent;
  let fixture: ComponentFixture<InvestesmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestesmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestesmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
