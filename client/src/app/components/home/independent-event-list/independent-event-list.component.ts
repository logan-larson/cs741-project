/**
 * List all events related to the organization
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-independent-event-list',
  templateUrl: './independent-event-list.component.html',
  styleUrls: ['./independent-event-list.component.css']
})
export class IndependentEventListComponent implements OnInit {

  events: Event[] = [];

  @Output() showAddEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectEventEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private eventsService: EventsService) {
    this.eventsService.getEventsEmitter.subscribe(() => {
      this.events = this.eventsService.getEvents();
    })
  }

  /**
   * Get all the events related to the organization
   */
  ngOnInit(): void {
    this.eventsService.getAllIndependentEvents((events: Event[]) => {
      this.events = events;
    });
  }
}
