import { TestBed } from '@angular/core/testing';

import { IsAuthenGuard } from './is-authen.guard';

describe('IsAuthenGuard', () => {
  let guard: IsAuthenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
