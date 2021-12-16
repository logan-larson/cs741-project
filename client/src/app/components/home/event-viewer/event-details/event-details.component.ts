/**
 * Show details related to an event
 */

import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input() event: Event = {};
  user: User = {};
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  volunteersNeeded: number = 0;

  constructor(
    private eventsService: EventsService,
  ) {
    this.eventsService.getEventsEmitter.subscribe(() => {
      let e = this.eventsService.getEvents().find(element => element.eventId == this.event.eventId);
      if (e) {
        this.event = e;
        this.setVolunteersNeeded();
      }
    });
  }

  ngOnInit(): void {

    // Format the dates and times
    if (this.event && this.event.date && this.event.timeStart && this.event.timeEnd) {
      this.date = new Date(this.event.date).toLocaleDateString();
      this.startTime = new Date(this.event.timeStart).toLocaleTimeString();
      this.endTime = new Date(this.event.timeEnd).toLocaleTimeString();
    }


    this.setVolunteersNeeded();

  }

  /**
   * Calculate the volunteers needed based on current volunteer count and volunteer requirement count
   */
  setVolunteersNeeded() {
    if (this.event && this.event.volunteerCountRequirement && this.event.registrationIds) {
      this.volunteersNeeded = this.event.volunteerCountRequirement - this.event.registrationIds?.length;
    }
  }

}
