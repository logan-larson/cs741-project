/**
 * Controls all requests related to donations
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from '../models/Donation';
import { Event } from '../models/Event';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  
  private isUnrestricted: boolean = false;

  constructor(private http: HttpClient) { }

  /**
   * Create a donation object related to a user
   */
  async makeDonation(amount: number, user: User, isUnrestricted: boolean, event?: Event): Promise<Donation> {
    let donation: Donation;

    if (isUnrestricted) {
      donation = await this.http.post<Donation>(
        '/api/donations/unrestricted',
        {
          amount: amount,
          user: user,
        }
      ).toPromise();
    } else {
      donation = await this.http.post<Donation>(
        '/api/donations',
        {
          amount: amount,
          user: user,
          event: event,
        }
      ).toPromise();
    }

    return donation;
  }

  /**
   * Request donations for an event made by the specified user
   */
  async getUsersDonationsForEvent(user: User, event: Event): Promise<Donation[]> {
    return this.http.get<Donation[]>(`/api/donations/user/${user.userId}/event/${event.eventId}`).toPromise();
  }

  /**
   * Get all user's donations
   */
  async getUsersDonations(user: User): Promise<Donation[]> {
    return this.http.get<Donation[]>(`/api/donations/user/${user.userId}`).toPromise();
  }

  /**
   * State management for make donation component
   */
  getIsUnrestricted(): boolean {
    return this.isUnrestricted;
  }

  setIsUnrestricted(val: boolean): void {
    this.isUnrestricted = val;
  }

}
