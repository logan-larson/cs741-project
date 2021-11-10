import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Event } from 'src/app/models/Event';
import { DonationsService } from 'src/app/services/donations.service';
import { DonationViewsService } from 'src/app/services/views/donation-views.service';
import { Program } from 'src/app/models/Program';
import { Donation } from 'src/app/models/Donation';

@Component({
  selector: 'app-make-donation',
  templateUrl: './make-donation.component.html',
  styleUrls: ['./make-donation.component.css']
})
export class MakeDonationComponent implements OnInit {

  // Input from home component
  @Input() user?: User;
  @Input() event?: Event;
  @Input() program?: Program;

  // Input from user
  @Input() amount?: number;

  // Type of donation
  type?: string;

  constructor(
    private donationViewsService: DonationViewsService,
    private donationsService: DonationsService
  ) { }

  ngOnInit(): void {
  }

  donate() {

    if (!this.user) {
      alert("Internal error");
      this.cancel();
      return;
    }

    if (!this.amount || (this.amount && this.amount <= 0)) {
      alert("Donation amount must be greater than 0");
      this.amount = undefined;
      return;
    }

    // Look into callback return types - TODO
    this.donationsService.makeDonation(this.amount, this.user, (donation: Donation | null) => {
      // Signal to users and events service that the user and event has been updated

      // Let components know they need to get an updated version
      // of user and event/program associated with the donation

      this.donationViewsService.showDonationComponent.emit(false);
    }, this.event, this.program)
  }

  cancel() {
    this.donationViewsService.showDonationComponent.emit(false);
  }

}
