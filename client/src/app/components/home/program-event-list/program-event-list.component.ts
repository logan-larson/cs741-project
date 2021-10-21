import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-program-event-list',
  templateUrl: './program-event-list.component.html',
  styleUrls: ['./program-event-list.component.css']
})
export class ProgramEventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents((events: Event[]) => {
      this.events = events;
    });
  }

}
