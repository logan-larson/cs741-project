import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Donation } from '../models/Donation';
import { Event } from '../models/Event';
import { Program } from '../models/Program';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  
  private isUnrestricted: boolean = false;

  constructor(private http: HttpClient) { }

  // Refer to comment in make donation - TODO
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

  async getUsersDonationsForEvent(user: User, event: Event): Promise<Donation[]> {
    return this.http.get<Donation[]>(`/api/donations/user/${user.userId}/event/${event.eventId}`).toPromise();
  }

  getIsUnrestricted(): boolean {
    return this.isUnrestricted;
  }

  setIsUnrestricted(val: boolean): void {
    this.isUnrestricted = val;
  }

}
