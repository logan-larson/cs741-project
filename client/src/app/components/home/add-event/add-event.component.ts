import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  // Placeholder values
  currentDate: string = new Date().toISOString().substr(0, 10);
  timeStartDate: Date = new Date();
  timeEndDate: Date = new Date(this.timeStartDate.getTime() + (2*60*60*1000));

  // Values gathered from inputs
  @Input() name: string = "";
  @Input() description: string = "";
  @Input() date: string = new Date().toISOString().substr(0, 10);
  @Input() timeStartString: string = this.timeStartDate.toTimeString().substr(0,5);
  @Input() timeEndString: string = this.timeEndDate.toTimeString().substr(0, 5);
  @Input() volunteersNeeded: number = 0;

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    console.log(new Date().toISOString().substr(11,5));
  }

  addEvent() {
    let currentTime: Date = new Date();

    let inputtedDate: Date = new Date(Date.parse(this.date));
    let inputtedStartTime: Date = new Date(Date.parse(`${this.date}T${this.timeStartString}:00`));
    let inputtedEndTime: Date = new Date(Date.parse(`${this.date}T${this.timeEndString}:00`));

    // Validation checks
    if (!this.name) {
      alert("Event name is required");
      return;
    }

    if (inputtedEndTime < inputtedStartTime) {
      alert("Start Time must be before End Time");
      return;
    }

    if (this.volunteersNeeded <= 0) {
      alert("Volunteers needed must be at least 1");
      return;
    }

    let event: Event = {
      name: this.name,
      description: this.description,
      date: inputtedDate,
      timeStart: inputtedStartTime,
      timeEnd: inputtedEndTime,
      volunteersNeeded: this.volunteersNeeded
    }

    this.eventsService.createEvent(event, (event: Event) => {
      if (event) {
        this.close.emit("close me");
      }
    });

  }

  cancel() {
    this.close.emit("close me");
  }
}