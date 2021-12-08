import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

import { Event } from '../models/Event';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: Event[] = [];

  @Output() selectedEventUpdatedEmitter: EventEmitter<any> = new EventEmitter();
  @Output() getSelectedEventEmitter: EventEmitter<any> = new EventEmitter();
  selectedEvent: Event = {};

  @Output() getEventsEmitter: EventEmitter<any> = new EventEmitter();



  constructor(private http: HttpClient) {
    this.selectedEventUpdatedEmitter.subscribe(() => {
      if (this.selectedEvent && this.selectedEvent.eventId) {
        this.getEventById(this.selectedEvent.eventId, (updatedEvent: Event) => {
          this.selectedEvent = updatedEvent;
          
          this.getSelectedEventEmitter.emit();
        })
      }
    })
  }

  getAllIndependentEvents(cb: any): void {
    this.http.get<Event[]>('/api/events/independent')
      .subscribe(events => {
        this.events = events;
        this.getEventsEmitter.emit();
        cb(events);
      })
  }

  getEvents(): Event[]  {
    return this.events;
  }

  getSelectedEvent(): Event {
    return this.selectedEvent;
  }

  getEventById(eventId: string, cb: any): void {
    this.http.get<Event>(`/api/events/${eventId}`)
      .subscribe((event: Event) => {
        cb(event);
      })
  }

  createEvent(event: Event, cb: any): void {
    this.http.post<Event>(`/api/events`, event)
      .subscribe(event => {
        if (event.isIndependent) {
          this.events.push(event);
        }
        this.getEventsEmitter.emit();
        cb(event);
      }, err => {
        console.log("Error in EventsService -> createEvent");
      })
  }

  setSelectedEvent(event: Event) {
    this.selectedEvent = event;
  }

  async cancelEvent(event: Event) {
    await this.http.post<Event>(`/api/events/${event.eventId}`, {}).toPromise();
    this.getAllIndependentEvents(() => {});
  }
}
