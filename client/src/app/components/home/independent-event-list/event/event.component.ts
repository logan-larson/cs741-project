import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users.service';
import { ViewsService } from 'src/app/services/views/views.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event?: Event;
  @Input() user?: User;
  date: string = "";
  startTime: string = "";
  endTime: string = "";
  name: string = "";
  volunteersNeeded: number = 0;
  isRegistered: boolean = false;
  isIndependent: boolean = true;

  constructor(
    private usersService: UsersService,
    private eventsService: EventsService,
    private viewsService: ViewsService
  ) {
    this.usersService.getCurrentUserEmitter.subscribe(() => {
      this.user = this.usersService.getUser();
      this.setIsRegistered();
    });

    this.eventsService.getEventsEmitter.subscribe(() => {
      this.event = this.eventsService.getSelectedEvent();
      this.setIsRegistered();
    });
  }

  ngOnInit(): void {
    this.user = this.usersService.getUser();

    if (this.user && this.event) {
      if (this.event.date) {
        this.date = new Date(this.event.date).toLocaleDateString();
      }
      if (this.event.timeStart) {
        this.startTime = new Date(this.event.timeStart).toLocaleTimeString();
      }
      if (this.event.timeEnd) {
        this.endTime = new Date(this.event.timeEnd).toLocaleTimeString();
      }
      if (this.event.volunteerCountRequirement && this.event.registrationIds) {
        this.volunteersNeeded = this.event.volunteerCountRequirement - this.event.registrationIds.length;
      }
      if (this.event.name) {
        this.name = this.event.name;
      }
        
      this.isIndependent = this.event.isIndependent!;

      this.setIsRegistered();

    }
  }

  viewEventDetails() {
    if (this.event) {
      this.eventsService.setSelectedEvent(this.event);
      this.viewsService.showEventViewerComponent.emit(true);
    }
  }

  setIsRegistered() {
    if (this.event && this.event.registrationIds) {
      
      this.isRegistered = false;
      this.event.registrationIds.forEach(eventRegId => {
        if (this.user && this.user.registrationIds) {
          this.user.registrationIds.forEach(userRegId => {
            if (eventRegId == userRegId) {
              this.isRegistered = true;
            }
          });
        }
      });

    }
  }

}
