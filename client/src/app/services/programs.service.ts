import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Program } from '../models/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  programs: Program[] = [];

  @Output() getProgramsEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAllPrograms(cb: any): void {
    this.http.get<Program[]>('/api/programs')
      .subscribe(programs => {
        this.programs = programs;
        cb(programs);
      })
  }

  getPrograms(): Program[] {
    return this.programs;
  }

  getAssociatedEvents(programId: string | undefined, cb: any): void {
    this.http.get<Event[]>(`/api/programs/${programId}/events`)
      .subscribe((events: Event[]) => {
        console.log(events);
        cb(events);
      })
  }

  updateEventIds(programId: string | undefined, eventId: string | undefined) {
    this.http.put<Program>(`/api/programs/${programId}/event/${eventId}`, null)
      .subscribe((program: Program) => {
        console.log(program);
      }, (error: any) => {
        console.log(error);
      })
  }

  createProgram(program: Program, cb: any): void {
    this.http.post<Program>('/api/programs', program)
      .subscribe(program => {
        this.programs.push(program);
        this.getProgramsEmitter.emit("get programs");
        cb(program);
      }, err => {
        console.log(err);
      })
  }
}
