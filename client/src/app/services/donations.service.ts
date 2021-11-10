import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from '../models/Donation';
import { Event } from '../models/Event';
import { Program } from '../models/Program';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(private http: HttpClient) { }

  // Refer to comment in make donation - TODO
  makeDonation(amount: number, user: User, cb: (donation: Donation | null) => void, event?: Event, program?: Program) {
    this.http.post('/api/donations',
    {
      amount: amount,
      user: user,
      event: event,
      program: program
    }
    ).subscribe((donation: Donation) => {
      cb(donation)
    }, (err: HttpErrorResponse) => {
      console.log(err);
      
      cb(null);
    });
  }

  async getUsersDonationsForEvent(user: User, event: Event): Promise<Donation[]> {
    return this.http.get<Donation[]>(`/api/donations/user/${user.userId}/event/${event.eventId}`).toPromise();
  }
}
