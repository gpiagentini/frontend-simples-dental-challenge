import { TestBed } from '@angular/core/testing';

import { GridColumnService } from './grid-column.service';

describe('GridColumnService', () => {
  let service: GridColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
