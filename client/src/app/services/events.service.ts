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

  createEvent(programId: string, event: Event, cb: any): void {
    this.http.post<Event>(`/api/events/${programId}`, event)
      .subscribe(event => {
        if (event.isIndependent) {
          this.events.push(event);
        }
        console.log(programId);
        
        this.getEventsEmitter.emit(programId);
        cb(event);
      }, err => {
        console.log(err);
      })
  }

  getVolunteerRegistrationStatus(event: Event, user: User, cb: any) {
    this.http.get<boolean>(`/api/events/${event.eventId}/volunteers/${user.userId}`)
      .subscribe((isRegistered: boolean) => {
        cb(isRegistered);
      }, err => {
        console.log(err);
      })
  }

  changeEventVolunteerStatus(event: Event, user: User) {
    this.http.put<Event>(`/api/events/${event.eventId}/volunteers`, user)
      .subscribe((updatedEvent: Event) => {
        console.log(updatedEvent.volunteerUserIds);
        // Reflect change in list view
        // Update local events
        this.events = this.events.filter(event => event.eventId != updatedEvent.eventId);
        this.events.push(updatedEvent);
        // Send out events emitter
        this.getEventsEmitter.emit("get events");
      });
  }
}
