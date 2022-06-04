import { TestBed } from '@angular/core/testing';

import { ScheduleCheckedListService } from './schedule-checked-list.service';

describe('ScheduleCheckedListService', () => {
  let service: ScheduleCheckedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleCheckedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
