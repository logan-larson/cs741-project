import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { Program } from 'src/app/models/Program';

@Component({
  selector: 'app-independent-event-list',
  templateUrl: './independent-event-list.component.html',
  styleUrls: ['./independent-event-list.component.css']
})
export class IndependentEventListComponent implements OnInit {

  events: Event[] = [];
  currentUser: User = {};

  @Output() showAddEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectEventEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private eventsService: EventsService, private usersService: UsersService) {
    this.eventsService.getEventsEmitter.subscribe(() => {
      this.events = this.eventsService.getEvents();
    })
  }

  ngOnInit(): void {
    this.eventsService.getAllIndependentEvents((events: Event[]) => {
      this.events = events;
    });
    this.usersService.getCurrentUser((user: User) => {
      this.currentUser = user;
    })
  }

  addEvent(): void {
    // This might need two versions, one for events under programs
    // and one for standalone events
    this.showAddEventEmitter.emit("show add event component");
  }

  selectEvent(event: Event) {
    this.eventsService.setSelectedEvent(event);
    this.selectEventEmitter.emit(event);
  }

}
