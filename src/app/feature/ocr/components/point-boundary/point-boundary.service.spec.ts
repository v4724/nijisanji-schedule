import { TestBed } from '@angular/core/testing';

import { PointBoundaryService } from './point-boundary.service';

describe('PointBoundaryService', () => {
  let service: PointBoundaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointBoundaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
