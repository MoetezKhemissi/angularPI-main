import { TestBed } from '@angular/core/testing';

import { InvestesmentService } from './investesment.service';

describe('InvestesmentService', () => {
  let service: InvestesmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestesmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
