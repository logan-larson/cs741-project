import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

import { Event } from '../models/Event';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: Event[] = [];

  @Output() getEventsEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAllIndependentEvents(cb: any): void {
    this.http.get<Event[]>('/api/events/independent')
      .subscribe(events => {
        this.events = events;
        cb(events);
      })
  }

  getEvents(): Event[]  {
    return this.events;
  }

  getEventById(eventId: string, cb: any): void {
    this.http.get<Event>(`/api/events/${eventId}`)
      .subscribe((event: Event) => {
        cb(event);
      })
  }

  createEvent(programId: string, event: Event, cb: any): void {
    this.http.post<Event>(`/api/events/${programId}`, event)
      .subscribe(event => {
        if (event.isIndependent) {
          this.events.push(event);
        }
        this.getEventsEmitter.emit(programId);
        cb(event);
      }, err => {
        console.log("Error in EventsService -> createEvent");
      })
  }
}
