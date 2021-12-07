import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationsService } from 'src/app/services/registrations.service';
import { UsersService } from 'src/app/services/users.service';
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
  isRegistered?: boolean;
  previousIsRegistered: boolean = false;
  registrationId?: string;

  // Inputs passed by home component
  @Input() event: Event = {};
  @Input() user: User = {};

  // Emit when close
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private eventsService: EventsService,
    private registrationsService: RegistrationsService,
    private usersService: UsersService
  ) {
    this.eventsService.getSelectedEventEmitter.subscribe(() => {
      this.event = this.eventsService.getSelectedEvent();
    });

    this.usersService.getCurrentUserEmitter.subscribe(() => {
      this.user = this.usersService.getUser();
    });
  }
  

  ngOnInit(): void {
    this.user = this.usersService.getUser();
    this.event = this.eventsService.getSelectedEvent();

    if (this.user) {
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
        if (this.user.activeRegistrationIds) {
          this.user.activeRegistrationIds.forEach(userRegId => {
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
    this.close();
  }

  setIsRegistered(isRegistered: boolean) {
    this.isRegistered = isRegistered;
  }

  refreshEvent() {
    if (this.event.eventId) {
      this.eventsService.getEventById(this.event.eventId, (event: Event) => {
        this.event = event;
      });
    }
  }
}
