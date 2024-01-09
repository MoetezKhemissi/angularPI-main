import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestesmentComponent } from './investesment.component';

describe('InvestesmentComponent', () => {
  let component: InvestesmentComponent;
  let fixture: ComponentFixture<InvestesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestesmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
