import { TestBed } from '@angular/core/testing';

import { TemplateResultService } from './template-result.service';

describe('TemplateFormResultService', () => {
  let service: TemplateResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
