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
  
  private type: string = "unrestricted";

  constructor(private http: HttpClient) { }

  // Refer to comment in make donation - TODO
  async makeDonation(amount: number, user: User, type: string, event?: Event): Promise<Donation> {
    const donation: Donation = await this.http.post<Donation>(
      '/api/donations',
      {
        amount: amount,
        user: user,
        event: event,
      }
    ).toPromise();

    return donation;
  }

  async getUsersDonationsForEvent(user: User, event: Event): Promise<Donation[]> {
    return this.http.get<Donation[]>(`/api/donations/user/${user.userId}/event/${event.eventId}`).toPromise();
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }
}
