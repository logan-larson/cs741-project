import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { Registration } from 'src/app/models/Registration';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationsService } from 'src/app/services/registrations.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-volunteer-section',
  templateUrl: './volunteer-section.component.html',
  styleUrls: ['./volunteer-section.component.css']
})
export class VolunteerSectionComponent implements OnInit {

  // Input passed by event viewer component
  //@Input() event: Event = {};
  //@Input() user: User = {};
  user?: User;
  event?: Event;

  showButton: boolean = false;
  buttonText: string = "";
  registrationStatus: string = "";
  registrationId: string = "";
  @Input() isRegistered: boolean = false;
  @Output() eventChangeEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private registrationsService: RegistrationsService,
    private eventsService: EventsService,
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    // Calculate registration status
    this.user = this.usersService.getUser();
    
    this.event = this.eventsService.getSelectedEvent();

    let eventRegs: Registration[] = [];
    if (this.event.eventId) {
      eventRegs = await this.registrationsService.getEventRegistrations(this.event.eventId);
    }

    this.showButton = true;
    this.isRegistered = false;
    this.registrationStatus = "Unregistered";
    for (const reg of eventRegs) {
      if (this.user.activeRegistrationIds?.includes(reg.registrationId!) || this.user.inactiveRegistrationIds?.includes(reg.registrationId!)) {
        this.showButton = false;
        this.isRegistered = true;
        this.registrationStatus = "Registered";
      }
    }

  }

  register() {
    if (this.user && this.event) {
      this.registrationsService.createRegistration(
        this.user,
        this.event,
        (registration: Registration) => {
          if (registration) {
            // On successful registration, update view
            this.isRegistered = true;
            this.registrationStatus = "Registered";
            this.showButton = false;
            if (registration.registrationId) {
              this.registrationId = registration.registrationId;
            }
            this.eventChangeEmitter.emit(true);

            this.eventsService.getAllIndependentEvents(() => {
              this.usersService.userUpdatedEmitter.emit(true);
              this.eventsService.selectedEventUpdatedEmitter.emit(true);

              this.usersService.getCurrentUserEmitter.emit(true);
              this.eventsService.getEventsEmitter.emit(true);
            })
          }
      })
    }
  }

}
