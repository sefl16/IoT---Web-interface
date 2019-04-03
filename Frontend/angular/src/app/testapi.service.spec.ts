import { TestBed } from '@angular/core/testing';

import { TestapiService } from './testapi.service';

describe('TestapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestapiService = TestBed.get(TestapiService);
    expect(service).toBeTruthy();
  });
});
