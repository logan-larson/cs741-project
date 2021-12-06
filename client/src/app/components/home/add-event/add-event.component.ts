import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';
import { ViewsService } from 'src/app/services/views/views.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  // Placeholder values
  currentDate: Date = new Date();
  timeStartDate: Date = new Date();
  timeEndDate: Date = new Date(this.timeStartDate.getTime() + (2*60*60*1000));

  // Values gathered from inputs
  @Input() name: string = "";
  @Input() description: string = "";
  @Input() date: string = "";
  @Input() timeStartString: string = this.timeStartDate.toTimeString().substr(0,5);
  @Input() timeEndString: string = this.timeEndDate.toTimeString().substr(0, 5);
  @Input() volunteerCountRequirement: number = 0;

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private eventsService: EventsService, private viewsService: ViewsService) { }

  ngOnInit(): void {
    this.date = this.parseDate(this.currentDate);
  }
  
  parseDate(date: Date): string {
    let day: number = date.getDate();
    let month: number = date.getMonth()+1;
    let year: number = date.getFullYear();

    return `${this.addZeroes(year.toString())}-${this.addZeroes(month.toString())}-${this.addZeroes(day.toString())}`;
  }

  addZeroes(str: string): string {
    let ret: string = str;
    if (ret.length == 1) {
        ret = "0" + ret;
    }
    return ret;
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

    if (this.volunteerCountRequirement <= 0) {
      alert("Volunteers needed must be at least 1");
      return;
    }

    let isIndependent: boolean = true;

    const localDate: Date = new Date(inputtedDate);
    localDate.setHours(localDate.getHours() + 6);

    let event: Event = {
      name: this.name,
      description: this.description,
      date: localDate,
      timeStart: inputtedStartTime,
      timeEnd: inputtedEndTime,
      volunteerCountRequirement: this.volunteerCountRequirement,
      isIndependent: isIndependent
    }

    let id: string = 'undefined';

    this.eventsService.createEvent(id, event, (event: Event) => {
      if (event) {
        this.viewsService.showAddEventComponent.emit(false);
      }
    });

  }

  cancel() {
    this.viewsService.showAddEventComponent.emit(false);
  }
}