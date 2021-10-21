import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {

  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeEmitter.emit("close me");
  }

}
