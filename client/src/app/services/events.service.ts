/**
 * Controls all requests related to events
 * Also controls current event selected, client-side state management
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

import { Event } from '../models/Event';

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

  /**
   * Gets a list of all events in the system
   */
  getAllIndependentEvents(cb: any): void {
    this.http.get<Event[]>('/api/events/independent')
      .subscribe(events => {
        this.events = events;
        this.getEventsEmitter.emit();
        cb(events);
      })
  }

  /**
   * Used by components to get a list of the events, state management
   */
  getEvents(): Event[]  {
    return this.events;
  }

  /**
   * Used by components to get the currently selected event
   */
  getSelectedEvent(): Event {
    return this.selectedEvent;
  }

  /**
   * Get an event by its ID on client-side
   */
  getMyEvent(eventId: string): Event | undefined {
    return this.events.find((event) => { event.eventId == eventId });
  }

  /**
   * Get an event by its ID on server-side
   */
  getEventById(eventId: string, cb: any): void {
    this.http.get<Event>(`/api/events/${eventId}`)
      .subscribe((event: Event) => {
        cb(event);
      })
  }

  /**
   * Request to create a new event
   */
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

  /**
   * Sets the currently selected event
   */
  setSelectedEvent(event: Event) {
    this.selectedEvent = event;
  }

  /**
   * Requests server to cancel the specified event
   */
  async cancelEvent(event: Event) {
    await this.http.post<Event>(`/api/events/${event.eventId}`, {}).toPromise();
    this.getAllIndependentEvents(() => {});
  }
}
