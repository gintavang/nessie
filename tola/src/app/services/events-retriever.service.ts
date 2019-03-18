import { Injectable } from '@angular/core';
import { ManagedEvent } from '../models/managed-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsRetrieverService {

  constructor() { }

  public getEvents(): ManagedEvent[] {
    return [new ManagedEvent('', '', '', '')];  
  }
}
