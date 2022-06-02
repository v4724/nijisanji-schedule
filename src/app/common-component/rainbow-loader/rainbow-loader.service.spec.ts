import { TestBed } from '@angular/core/testing';

import { RainbowLoaderService } from './rainbow-loader.service';

describe('RainbowLoaderService', () => {
  let service: RainbowLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainbowLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
