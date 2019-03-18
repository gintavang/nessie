import { TestBed } from '@angular/core/testing';

import { EventsRetrieverService } from './events-retriever.service';

describe('EventsRetrieverService', () => {
  let service: EventsRetrieverService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(EventsRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEvents', () => {
    it('should return an array of ManagedEvents', () => {
      expect(service.getEvents()).toBeTruthy();
    });
  });

  
});
