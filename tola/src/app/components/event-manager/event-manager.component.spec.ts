import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventManagerComponent } from './event-manager.component';
import {EventsRetrieverService} from '../../services/events-retriever.service';
import * as td from 'testdouble';
import { ManagedEvent } from '../../models/managed-event.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

describe('EventManagerComponent', () => {
  let component: EventManagerComponent;
  let fixture: ComponentFixture<EventManagerComponent>;
  let mockEventsRetriever;

  beforeEach(async(() => {
    mockEventsRetriever = td.object(EventsRetrieverService.prototype);
    mockEventsRetriever.getEvents = td.function();

    TestBed.configureTestingModule({
      declarations: [ EventManagerComponent ], providers: [{provide: EventsRetrieverService, useValue: mockEventsRetriever}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component', () => {
    describe('ngOnInit', () => {
      it('should call the EventsRetriever service for a list of events', () => {
        const expectedEvents = [new ManagedEvent('Stove Sale', 'the stove yard', 'stoves as far as the eye can see', 'www.stovesale.com'), new ManagedEvent('', '', '', '')]
        td.when(mockEventsRetriever.getEvents()).thenReturn(expectedEvents);
        component.ngOnInit();
        expect(component.events).toEqual(expectedEvents);
      });
    });
    
  });

  describe('template', () => {
    let expectedEvents: ManagedEvent[];
    beforeEach(() => {
      const event1 = new ManagedEvent('title1', 'location1', 'description1', 'link1');
      const event2 = new ManagedEvent('title2', 'location2', 'description2', 'link2');
      expectedEvents = [event1, event2];
      component.events = expectedEvents;
    });
    it('should render all events, each in rows', () => {
      fixture.detectChanges();
      const actualEvents = fixture.debugElement.queryAll(By.css('.row'));
      expect(actualEvents.length).toEqual(2);
    });

    it('should display the event properties', () => {
      fixture.detectChanges();
      const actualEvents = fixture.debugElement.queryAll(By.css('.row'));
      for (let i = 0; i < actualEvents.length; i++) {
        checkEventProperties(actualEvents[i], expectedEvents[i]);
      }
    });
  });
});

function checkEventProperties(actualEvent: DebugElement, expectedEvent: ManagedEvent) {
  const event = actualEvent.queryAll(By.css('p'));
  expect(event.length).toEqual(4);
  expect(event[0].nativeElement.textContent).toEqual(expectedEvent.title);
  expect(event[1].nativeElement.textContent).toEqual(expectedEvent.location);
  expect(event[2].nativeElement.textContent).toEqual(expectedEvent.description);
  expect(event[3].nativeElement.textContent).toEqual(expectedEvent.link);
}

