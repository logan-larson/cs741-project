/**
 * Lists all donations related to a user
 */

import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { User } from 'src/app/models/User';
import { DonationsService } from 'src/app/services/donations.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations-list.component.html',
  styleUrls: ['./donations-list.component.css']
})
export class DonationsListComponent implements OnInit {

  user: User = {};
  donations: Donation[] = [];

  constructor(
    private usersService: UsersService,
    private donationsService: DonationsService
  ) {
    this.usersService.getCurrentUserEmitter.subscribe(() => {
      this.user = this.usersService.getUser();
      this.getDonations();
    })
  }

  ngOnInit(): void {
    this.usersService.userUpdatedEmitter.emit();
  }

  /**
   * Called when a user gets updated
   * Get the updated user's donations
   */
  async getDonations() {
    this.donations = await this.donationsService.getUsersDonations(this.user);
  }

}
