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
  async makeDonation(amount: number, user: User, type: string, event?: Event, program?: Program): Promise<Donation> {
    const donation: Donation = await this.http.post<Donation>(
      '/api/donations',
      {
        type: type,
        donation: {
          amount: amount,
          user: user,
          event: event,
          program: program
        }
      }
    ).toPromise();

    return donation;
    
    /*
    .subscribe((donation: Donation) => {
      cb(donation)
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    */
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
