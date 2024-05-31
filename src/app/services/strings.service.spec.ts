import { TestBed } from '@angular/core/testing';

import { StringsService } from './strings.service';

describe('StringsService', () => {
  let service: StringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
