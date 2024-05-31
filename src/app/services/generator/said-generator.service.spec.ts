import { TestBed } from '@angular/core/testing';

import { SaidGeneratorService } from './said-generator.service';

describe('SaidGeneratorService', () => {
  let service: SaidGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
