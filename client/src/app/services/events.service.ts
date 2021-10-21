import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvents(cb: any): void {
    this.http.get<Event[]>('/api/events')
      .subscribe(events => {
        cb(events);
      })
  }

  createEvent(cb: any): void {
    let event: Event = {
      name: "Event Name",
      description: "Event description",
      date: new Date(),
      timeStart: new Date(),
      timeEnd: new Date(),
      volunteersNeeded: 3
    };

    this.http.post<Event>('/api/events', event)
      .subscribe(event => {
        cb(event);
      }, err => {
        console.log(err);
      })
  }
}
