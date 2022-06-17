import { TestBed } from '@angular/core/testing';

import { StreamGroupService } from './stream-group.service';

describe('StreamGroupService', () => {
  let service: StreamGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
