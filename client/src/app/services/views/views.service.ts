import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  showDonationComponent: EventEmitter<boolean> = new EventEmitter();
  showEventViewerComponent: EventEmitter<boolean> = new EventEmitter();
  showAddEventComponent: EventEmitter<boolean> = new EventEmitter();
  showReportComponent: EventEmitter<boolean> = new EventEmitter();
  showHelpComponent: EventEmitter<boolean> = new EventEmitter();
  mainList: EventEmitter<string> = new EventEmitter();

  constructor() { }
}
