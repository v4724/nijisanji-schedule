import { TestBed } from '@angular/core/testing';

import { ExcelStreamService } from './excel-stream.service';

describe('ExcelStreamService', () => {
  let service: ExcelStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
