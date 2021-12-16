/**
 * Show a user report based on donation and volunteer history
 */

import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { User } from 'src/app/models/User';
import { DonationsService } from 'src/app/services/donations.service';
import { RegistrationsService } from 'src/app/services/registrations.service';
import { UsersService } from 'src/app/services/users.service';
import { ViewsService } from 'src/app/services/views/views.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  user: User = {};
  volunteerHours: number = 0;
  volunteerMinutes: number = 0;
  donations: Donation[] = [];

  constructor(
    private usersService: UsersService,
    private viewsService: ViewsService,
    private donationsService: DonationsService,
    private registrationsService: RegistrationsService
  ) { }

  async ngOnInit() {
    this.user = this.usersService.getReportUser();

    // Get users volunteer hours
    const volunteerTime: number = await this.registrationsService.getVolunteerTime(this.user.userId!);
    this.volunteerHours = volunteerTime / 60;
    this.volunteerMinutes = volunteerTime % 60;

    // Get users donations
    this.donations = await this.donationsService.getUsersDonations(this.user);

  }

  /**
   * Close popup
   */
  close() {
    this.viewsService.showReportComponent.emit(false);
  }

}
