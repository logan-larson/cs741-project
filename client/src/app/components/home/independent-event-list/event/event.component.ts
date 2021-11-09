import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event = {};
  @Input() user: User = {};
  date: string = "";
  startTime: string = "";
  endTime: string = "";
  volunteersNeeded: number = 0;
  isRegistered: boolean = false;

  constructor(private usersService: UsersService, private eventsService: EventsService) {
    this.usersService.getCurrentUserEmitter.subscribe(() => {
      this.user = this.usersService.getUser();
      this.eventsService.getEventsEmitter.subscribe(() => {
        let e = this.eventsService.getEvents().find(element => element.eventId == this.event.eventId);
        if (e) {
          this.event = e;
        }

        this.setIsRegistered();
      });

    });

  }

  ngOnInit(): void {
    this.user = this.usersService.getUser();

    if (this.event) {
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

      this.setIsRegistered();

    }
  }

  setIsRegistered() {
    if (this.event && this.event.registrationIds) {
      console.log("event && event.registrationIds");
      
      this.isRegistered = false;
      this.event.registrationIds.forEach(eventRegId => {
        if (this.user && this.user.registrationIds) {
          console.log("user && user.registrationIds");
          this.user.registrationIds.forEach(userRegId => {
            if (eventRegId == userRegId) {
              console.log("Registered for " + this.event.name);
              
              this.isRegistered = true;
            }
          });
        }
      });

    }

    console.log("Event: " + this.event.name + "isRegged: " + this.isRegistered)
  }

}
