import { TestBed } from '@angular/core/testing';

import { StreamTypeService } from './stream-type.service';

describe('StreamTypeService', () => {
  let service: StreamTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
