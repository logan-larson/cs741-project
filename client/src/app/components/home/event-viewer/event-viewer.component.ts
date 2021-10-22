import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {

  // Fields subject to change by user
  isRegistered: boolean | undefined;
  previousIsRegistered: boolean = false;

  // Inputs passed by home component
  @Input() event: Event = {};
  @Input() currentUser: User = {};

  // Emit when close
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    if (this.currentUser) {
      this.getIsRegistered(this.currentUser);
    }
  }

  getIsRegistered(user: User) {
    this.eventsService.getVolunteerRegistrationStatus(this.event, user, (isRegistered: boolean) => {
      console.log(isRegistered);
      this.isRegistered = isRegistered;
      this.previousIsRegistered = isRegistered;
    })
  }

  close() {
    this.closeEmitter.emit("close me");
  }

  save() {
    // Add all fields that changed to user
    if (this.previousIsRegistered != this.isRegistered) {
      this.eventsService.changeEventVolunteerStatus(this.event, this.currentUser);
    }


    // Update user

    this.close();
  }

  setIsRegistered(isRegistered: boolean) {
    this.isRegistered = isRegistered;
  }

}
