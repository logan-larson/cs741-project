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

  async unregisterFromEvent(registrationId: string, user: User, event: Event) {
    this.http.post<Registration>(`/api/registrations/${registrationId}`, { user: user, event: event })
      .subscribe((registration: Registration) => {
        return registration;
      }, (err: any) => {
        return err;
      })
  }

  async registerForEvent(user: User, event: Event) {
    this.http.post<Registration>(`/api/registrations`, { user: user, event: event })
      .subscribe((registration: Registration) => {
        return registration;
      }, (err: HttpErrorResponse) => {
        if (err.message == "Overlap") {
          return err.message;
        }
        return err;
      });
  }

}
