import { TestBed } from '@angular/core/testing';

import { HomeMessagesService } from './home-messages.service';

describe('HomeMessagesService', () => {
  let service: HomeMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
