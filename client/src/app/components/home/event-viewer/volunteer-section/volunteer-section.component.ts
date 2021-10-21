import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer-section',
  templateUrl: './volunteer-section.component.html',
  styleUrls: ['./volunteer-section.component.css']
})
export class VolunteerSectionComponent implements OnInit {

  buttonText: string = "Register to volunteer";
  registrationStatus: string = "Not registered";

  constructor() { }

  ngOnInit(): void {
  }

}
