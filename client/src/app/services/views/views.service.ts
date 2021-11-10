import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  showDonationComponent: EventEmitter<boolean> = new EventEmitter();
  showEventViewerComponent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
