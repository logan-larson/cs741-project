import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { Program } from 'src/app/models/Program';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  @Input() program: Program = {};
  dateStart: string = "";
  dateEnd: string = "";

  events: Event[] = [];
  hasEvents: boolean = false;
  currentUser: User = {};

  @Output() showAddEventToProgramEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectEventEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private programsService: ProgramsService, private usersService: UsersService, private eventsService: EventsService) {
    this.eventsService.getEventsEmitter.subscribe((programId: string) => {
      if (this.program && programId == this.program.programId) {
        this.programsService.getAssociatedEvents(programId, (events: Event[]) => {
          this.events = events;
        })
      }
    })
  }

  ngOnInit(): void {
    if (this.program) {
      if (this.program.dateStart) {
        this.dateStart = new Date(this.program.dateStart).toLocaleDateString();
      }
      if (this.program.dateEnd) {
        this.dateEnd = new Date(this.program.dateEnd).toLocaleDateString();
      }
      this.programsService.getAssociatedEvents(this.program.programId, (events: Event[]) => {
        this.events = events;
        this.hasEvents = events.length != 0 ? true : false;
      })

      this.usersService.getCurrentUser((user: User) => {
        this.currentUser = user;
      })
    }
  }

  addEventToProgram() {
    this.showAddEventToProgramEmitter.emit(this.program.programId);
  }

  selectEvent(event: Event) {
    this.selectEventEmitter.emit(event);
  }

  viewProgramDetails() {
    
  }

}
