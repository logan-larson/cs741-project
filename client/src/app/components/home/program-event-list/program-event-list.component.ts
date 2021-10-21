import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-program-event-list',
  templateUrl: './program-event-list.component.html',
  styleUrls: ['./program-event-list.component.css']
})
export class ProgramEventListComponent implements OnInit {

  events: Event[] = [];
  currentUser: User = {};

  @Output() showAddEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private eventsService: EventsService, private usersSerivce: UsersService) {
    this.eventsService.getEventsEmitter.subscribe(() => {
      this.events = this.eventsService.getEvents();
    })
  }

  ngOnInit(): void {
    this.eventsService.getAllEvents((events: Event[]) => {
      this.events = events;
    });
    this.usersSerivce.getCurrentUser((user: User) => {
      this.currentUser = user;
    })
  }

  addEvent(): void {
    this.showAddEventEmitter.emit("show add event component");
    /*
    this.eventsService.createEvent((event: Event) => {

      this.ngOnInit();
    });
    */
  }

}
