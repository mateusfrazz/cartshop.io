import { TestBed } from '@angular/core/testing';

import { GerData } from './ger-data';

describe('GerData', () => {
  let service: GerData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
