import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../models/Registration';
import { User } from '../models/User';
import { Event } from '../models/Event';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
  ) { }

  unregisterFromEvent(registrationId: string, user: User, event: Event, cb: any): void {
    this.http.post<Registration>(`/api/registrations/${registrationId}`, { user: user, event: event })
      .subscribe((registration: Registration) => {
        cb(registration);
      }, (err: any) => {
        console.log("Error in RegistrationsService -> unregisterFromEvent");
        cb(null);
      })
  }

  createRegistration(user: User, event: Event, cb: any): void {
    const body = {
      user: user,
      event: event
    };

    console.log(body);
    
    this.http.post<Registration>(`/api/registrations`, { user: user, event: event })
      .subscribe((registration: Registration) => {
        cb(registration)
      }, (err: HttpErrorResponse) => {
        console.log("Error in RegistrationsService -> registerForEvent");
        if (err.status == 400) {
          alert("You cannot register to volunteer for this event");
        }
        cb(null);
      });
  }

  async getEventRegistrations(eventId: string): Promise<Registration[]> {
    return await this.http.get<Registration[]>(`/api/registrations/${eventId}`).toPromise();
  }

  async getUserActiveRegistrations(userId: string): Promise<Registration[]> {
    return await this.http.get<Registration[]>(`/api/registrations/user/${userId}/active`).toPromise();
  }

  async getUserInactiveRegistrations(userId: string): Promise<Registration[]> {
    return await this.http.get<Registration[]>(`/api/registrations/user/${userId}/inactive`).toPromise();
  }

  async activateRegistration(reg: Registration, event: Event): Promise<Registration> {
    let user: User = this.usersService.getUser();
    return await this.http.post<Registration>(
      `/api/registrations/${reg.registrationId!}/activate`, 
      {
        user,
        event
      }
    ).toPromise();
  }

  async deactivateRegistration(reg: Registration, event: Event): Promise<Registration> {
    console.log(reg.registrationId!);
    let user: User = this.usersService.getUser();
    return await this.http.post<Registration>(
      `/api/registrations/${reg.registrationId!}/deactivate`, 
      {
        user,
        event
      }
    ).toPromise();
  }
}
