import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input() event: Event = {};
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  volunteersNeeded: number = 0;

  constructor() {}

  ngOnInit(): void {
    // TODO format date and time properly
    /*
    if (this.event.date != undefined
      && this.event.timeStart != undefined
      && this.event.timeEnd != undefined) {
      this.date = this.event.date?.toDateString();
      this.startTime = this.event.timeStart?.toTimeString();
      this.endTime = this.event.timeEnd?.toTimeString();
    }
    */
    if (this.event && this.event.volunteerCountRequirement && this.event.registrationIds) {
      this.volunteersNeeded = this.event.volunteerCountRequirement - this.event.registrationIds?.length;
    }


  }

}
