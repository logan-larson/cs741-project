import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationViewsService {

  showDonationComponent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
