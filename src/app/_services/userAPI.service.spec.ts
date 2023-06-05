import { TestBed } from '@angular/core/testing';

import { UserAPIService } from './userAPI.service';

describe('UserService', () => {
  let service: UserAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
