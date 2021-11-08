import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { Program } from 'src/app/models/Program';
import { User } from 'src/app/models/User';
import { ProgramsService } from 'src/app/services/programs.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

  programs: Program[] = [];
  currentUser: User = {};

  @Output() showAddProgramEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() showAddEventToProgramEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectProgramEmitter: EventEmitter<Program> = new EventEmitter();
  @Output() selectEventEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private programsService: ProgramsService, private usersService: UsersService) {
    this.programsService.getProgramsEmitter.subscribe(() => {
      this.programs = this.programsService.getPrograms();
    })
  }

  ngOnInit(): void {
    this.programsService.getAllPrograms((programs: Program[]) => {
      this.programs = programs;
    })
    this.usersService.getCurrentUser((user: User) => {
      this.currentUser = user;
    })
  }

  addProgram(): void {
    this.showAddProgramEmitter.emit("show add program component")
  }

  addEventToProgram(programId: any) {
    this.showAddEventToProgramEmitter.emit(programId);
  }

  selectProgram(program: Program) {
    this.selectProgramEmitter.emit(program);
  }

  selectEvent(event: Event) {
    this.selectEventEmitter.emit(event);
  }

}
