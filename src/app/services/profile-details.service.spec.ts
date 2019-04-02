import { TestBed } from '@angular/core/testing';

import { ProfileDetailsService } from './profile-details.service';

describe('ProfileDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileDetailsService = TestBed.get(ProfileDetailsService);
    expect(service).toBeTruthy();
  });
});
