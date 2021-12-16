/**
 * Controls all requests related to registrations
 */

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

  /**
   * Request user's event registration is created on the first time a user registers for an event
   */
  createRegistration(user: User, event: Event, cb: any): void {
    const body = {
      user: user,
      event: event
    };
    
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

  /**
   * Request list of registrations related to an event
   */
  async getEventRegistrations(eventId: string): Promise<Registration[]> {
    return await this.http.get<Registration[]>(`/api/registrations/${eventId}`).toPromise();
  }

  /**
   * Request a user's active registrations
   */
  async getUserActiveRegistrations(userId: string): Promise<Registration[]> {
    return await this.http.get<Registration[]>(`/api/registrations/user/${userId}/active`).toPromise();
  }

  /**
   * Request a user's inactive registrations
   */
  async getUserInactiveRegistrations(userId: string): Promise<Registration[]> {
    return await this.http.get<Registration[]>(`/api/registrations/user/${userId}/inactive`).toPromise();
  }

  /**
   * Request user's event registration is reactivated
   */
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

  /**
   * Request user's event registration is deactivated
   */
  async deactivateRegistration(reg: Registration, event: Event): Promise<Registration> {
    let user: User = this.usersService.getUser();
    return await this.http.post<Registration>(
      `/api/registrations/${reg.registrationId!}/deactivate`, 
      {
        user,
        event
      }
    ).toPromise();
  }

  /**
   * Request a user's volunteer time
   */
  async getVolunteerTime(userId: string): Promise<number> {
    return await this.http.get<number>(`/api/registrations/user/${userId}`).toPromise();
  }
}
