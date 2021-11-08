import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../models/Registration';
import { User } from '../models/User';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  constructor(private http: HttpClient) { }

  unregisterFromEvent(registrationId: string, user: User, event: Event, cb: any): void {
    this.http.post<Registration>(`/api/registrations/${registrationId}`, { user: user, event: event })
      .subscribe((registration: Registration) => {
        cb(registration);
      }, (err: any) => {
        console.log("Error in RegistrationsService -> unregisterFromEvent");
        cb(null);
      })
  }

  registerForEvent(user: User, event: Event, cb: any): void {
    this.http.post<Registration>(`/api/registrations`, { user: user, event: event })
      .subscribe((registration: Registration) => {
        cb(registration)
      }, (err: HttpErrorResponse) => {
        console.log("Error in RegistrationsService -> registerForEvent");
        if (err.message == "Overlap") {
          alert("You cannot register to volunteer for events with overlapping times");
        }
        cb(err);
      });
  }
}
