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
}
