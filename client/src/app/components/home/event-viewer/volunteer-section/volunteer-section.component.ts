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

  ngOnInit(): void {
    // Calculate registration status
    this.user = this.usersService.getUser();
    
    this.event = this.eventsService.getSelectedEvent();
    

    // Check if event registration ids contains a registration id in current user's registration ids
    // if so the user is registered to volunteer for event
    if (this.event && this.event.registrationIds) {
      this.event.registrationIds.forEach(eventRegId => {
        if (this.user && this.user.registrationIds) {
          this.user.registrationIds.forEach(userRegId => {
            if (eventRegId == userRegId) {
              this.isRegistered = true;
              this.registrationId = eventRegId;
            }
          });
        }
      });
    }

    this.registrationStatus = this.isRegistered ? "Registered" : "Not registered";
    this.buttonText = this.isRegistered ? "Unregister" : "Register";
  }

  async setRegistrationStatus() {
    // Use registration service to update registration status

    if (this.isRegistered && this.user && this.event) {
      this.registrationsService.unregisterFromEvent(
        this.registrationId, 
        this.user, 
        this.event, 
        (registration: Registration) => {
          if (registration) {
            // On successful registration or unregistration, update view
            this.isRegistered = false;
            this.registrationStatus = "Not registered";
            this.buttonText = "Register";
            this.eventChangeEmitter.emit(true);
            
            this.eventsService.getAllIndependentEvents(() => {
              this.eventsService.getEventsEmitter.emit(true);
              this.usersService.getCurrentUserEmitter.emit(true);
            });


          }
        });
    } else if (!this.isRegistered && this.user && this.event){
      this.registrationsService.registerForEvent(
        this.user,
        this.event,
        (registration: Registration) => {
          if (registration) {
            // On successful registration, update view
            this.isRegistered = true;
            this.registrationStatus = "Registered";
            this.buttonText = "Unregister";
            if (registration.registrationId) {
              this.registrationId = registration.registrationId;
            }
            this.eventChangeEmitter.emit(true);

            this.eventsService.getAllIndependentEvents(() => {
              this.usersService.getCurrentUserEmitter.emit(true);
              this.eventsService.getEventsEmitter.emit(true);
            });

          }
        })
      }
  }

}
