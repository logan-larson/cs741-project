import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-volunteer-section',
  templateUrl: './volunteer-section.component.html',
  styleUrls: ['./volunteer-section.component.css']
})
export class VolunteerSectionComponent implements OnInit {

  buttonText: string = "";
  registrationStatus: string = "";
  @Input() isRegistered: boolean = false;
  @Output() registrationStatusEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.registrationStatus = this.isRegistered ? "Registered" : "Not registered";
    this.buttonText = this.isRegistered ? "Unregister" : "Register";
  }

  setRegistrationStatus() {
    this.isRegistered = !this.isRegistered;
    this.registrationStatusEmitter.emit(this.isRegistered);
    this.registrationStatus = this.isRegistered ? "Registered" : "Not registered";
    this.buttonText = this.isRegistered ? "Unregister" : "Register";
  }

}
