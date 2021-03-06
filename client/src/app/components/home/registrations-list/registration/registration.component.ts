/**
 * Registration component that shows user's registration data
 */

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { Registration } from 'src/app/models/Registration';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationsService } from 'src/app/services/registrations.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() registration: Registration = {};
  @Input() isActive: boolean = false;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  event: Event = {};
  changeActivationString: string = "Cancel";
  timeStart: string = "";
  timeEnd: string = "";
  
  constructor(
    private eventsService: EventsService,
    private registrationsService: RegistrationsService
  ) { }

  async ngOnInit() {
    // Get the event
    this.eventsService.getEventById(this.registration.eventId!, (event: Event) => {
      this.event = event;

      this.timeStart = new Date(this.event.timeStart!).toLocaleTimeString();
      this.timeEnd = new Date(this.event.timeEnd!).toLocaleTimeString();
    });

    if (this.isActive) {
      this.changeActivationString = "Cancel";
    } else {
      this.changeActivationString = "Re-register";
    }
  }

  /**
   * Change registration from active to cancelled or vice versa
   */
  async changeActivation() {
    if (this.isActive) {
      let newReg: Registration = await this.registrationsService.deactivateRegistration(this.registration, this.event)
      this.updated.emit(newReg);
    } else {
      let newReg: Registration = await this.registrationsService.activateRegistration(this.registration, this.event)
      this.updated.emit(newReg);
    }
  }

}
