import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { Program } from 'src/app/models/Program';

@Component({
  selector: 'app-program-event-list',
  templateUrl: './program-event-list.component.html',
  styleUrls: ['./program-event-list.component.css']
})
export class ProgramEventListComponent implements OnInit {

  events: Event[] = [];
  programs: Program[] = [];
  currentUser: User = {};

  @Output() showAddEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() showAddProgramEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectEventEmitter: EventEmitter<Event> = new EventEmitter();
  @Output() selectProgramEmitter: EventEmitter<Program> = new EventEmitter();

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
    // This might need two versions, one for events under programs
    // and one for standalone events
    this.showAddEventEmitter.emit("show add event component");
  }

  addProgram(): void {
    this.showAddProgramEmitter.emit("show add program component")
  }

  selectEvent(event: Event) {
    this.selectEventEmitter.emit(event);
  }

  selectProgram(program: Program) {
    this.selectProgramEmitter.emit(program);
  }

}
