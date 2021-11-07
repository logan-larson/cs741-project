import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { Program } from 'src/app/models/Program';
import { User } from 'src/app/models/User';
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
  currentUser: User = {};

  @Output() showAddEventToProgramEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectEventEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private programsService: ProgramsService, private usersService: UsersService) { }

  ngOnInit(): void {
    if (this.program) {
      if (this.program.dateStart) {
        this.dateStart = new Date(this.program.dateStart).toLocaleDateString();
      }
      if (this.program.dateEnd) {
        this.dateEnd = new Date(this.program.dateEnd).toLocaleDateString();
      }
      this.programsService.getAssociatedEvents(this.program.programId, (events: Event[]) => {
        console.log(events);
        
        this.events = events;
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

}