import { TestBed } from '@angular/core/testing';

import { DonationViewsService } from './donation-views.service';

describe('DonationViewsService', () => {
  let service: DonationViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
