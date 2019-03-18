import { Component, OnInit } from '@angular/core';
import { ManagedEvent } from '../../models/managed-event.model';
import { EventsRetrieverService } from '../../services/events-retriever.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent implements OnInit {
  
  events: ManagedEvent[];

  constructor(private eventsRetrieverService: EventsRetrieverService) { }

  ngOnInit() {
    this.events = this.eventsRetrieverService.getEvents();
  }

}
