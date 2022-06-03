import { TestBed } from '@angular/core/testing';

import { OcrAnchorService } from './ocr-anchor.service';

describe('OcrAnchorService', () => {
  let service: OcrAnchorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcrAnchorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
