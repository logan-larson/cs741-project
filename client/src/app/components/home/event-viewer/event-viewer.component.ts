import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationsService } from 'src/app/services/registrations.service';
import { VolunteerSectionComponent } from './volunteer-section/volunteer-section.component';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {

  @ViewChild(VolunteerSectionComponent)
  private volunteerSectionComponent!: VolunteerSectionComponent

  // Fields subject to change by user
  isRegistered: boolean | undefined;
  previousIsRegistered: boolean = false;
  registrationId: string | undefined;

  // Inputs passed by home component
  @Input() event: Event = {};
  @Input() currentUser: User = {};

  // Emit when close
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private eventsService: EventsService, private registrationsService: RegistrationsService) { }

  ngOnInit(): void {
    if (this.currentUser) {
      this.getIsRegistered();
    }
  }

  getIsRegistered() {

    this.isRegistered = false;
    this.previousIsRegistered = false;

    // Check if event registration ids contains a registration id in current user's registration ids
    // if so the user is registered to volunteer for event
    if (this.event && this.event.registrationIds) {
      this.event.registrationIds.forEach(eventRegId => {
        if (this.currentUser.registrationIds) {
          this.currentUser.registrationIds.forEach(userRegId => {
            if (eventRegId == userRegId) {
              this.isRegistered = true;
              this.previousIsRegistered = true;
              this.registrationId = eventRegId;
            }
          });
        }
      });
    }
  }

  close() {
    this.closeEmitter.emit("close me");
  }

  async save() {
    // Add all fields that changed to user
    if ((this.currentUser.type == 'volunteer' || this.currentUser.type == 'both') && this.previousIsRegistered != this.isRegistered) {
      if (this.registrationId) {
        await this.registrationsService.unregisterFromEvent(this.registrationId, this.currentUser, this.event);
        console.log("unregistered");
      } else {
        let registered: any = await this.registrationsService.registerForEvent(this.currentUser, this.event);
        if (!registered) {
          alert("You cannot register to volunteer for events with overlapping times");
          this.isRegistered = false;
          this.previousIsRegistered = false;
          this.volunteerSectionComponent.setRegistrationStatus();
          return;
        }
      }
    }


    // Update user

    this.close();
  }

  setIsRegistered(isRegistered: boolean) {
    this.isRegistered = isRegistered;
  }

}
