import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: Event[] = [];

  @Output() getEventsEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAllEvents(cb: any): void {
    this.http.get<Event[]>('/api/events')
      .subscribe(events => {
        this.events = events;
        cb(events);
      })
  }

  getEvents(): Event[]  {
    return this.events;
  }

  createEvent(event: Event, cb: any): void {
    this.http.post<Event>('/api/events', event)
      .subscribe(event => {
        this.events.push(event);
        this.getEventsEmitter.emit("get events");
        cb(event);
      }, err => {
        console.log(err);
      })
  }
}
