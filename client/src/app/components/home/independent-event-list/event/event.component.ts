import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event = {};
  date: string = "";
  startTime: string = "";
  endTime: string = "";
  volunteersNeeded: number = 0;

  constructor() {}

  ngOnInit(): void {
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
    }
  }

}
