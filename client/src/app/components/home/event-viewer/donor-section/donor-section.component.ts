import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { DonationsService } from 'src/app/services/donations.service';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users.service';
import { DonationViewsService } from 'src/app/services/views/donation-views.service';

@Component({
  selector: 'app-donor-section',
  templateUrl: './donor-section.component.html',
  styleUrls: ['./donor-section.component.css']
})
export class DonorSectionComponent implements OnInit {

  @Input() user?: User;
  @Input() event?: Event;

  @Output() showDonationComponent: EventEmitter<boolean> = new EventEmitter();

  amountDonated: number = 0;

  constructor(
    private donationViewsService: DonationViewsService,
    private donationsService: DonationsService,
    private usersService: UsersService,
    private eventsService: EventsService
  ) {
    this.eventsService.getSelectedEventEmitter
      .subscribe(() => {
        console.log("All changed");
        
        this.user = this.usersService.getUser();
        this.event = this.eventsService.getSelectedEvent();

        console.log("Got updated event and user");
        console.log(this.user);
        console.log("---------------------------");
        console.log(this.event);
        console.log("---------------------------\n");
        
        this.setAmountDonated();
      });


    // Listen for change from make donation?
  }

  ngOnInit(): void {
    this.setAmountDonated();

    // TODO - expand donor section to accomodate programs
  }

  async setAmountDonated() {
    // TODO - For events
    // Given the user donationIds and event donationIds
    // Find the donations the user has made to the event
    // Add the amounts of those donations to this.amount
    console.log(this.user);
    

    if (this.user && this.user.donationIds && this.event && this.event.donationIds) {
      const donationIds: string[] = [];

      for (const userDonId of this.user.donationIds) {
        for (const eventDonId of this.event.donationIds) {
          if (userDonId == eventDonId) {
            donationIds.push(userDonId);
          }
        }
      }

      this.amountDonated = 0;

      const donations: Donation[] = await this.donationsService.getUsersDonationsForEvent(this.user, this.event);
      for (const donation of donations) {
        this.amountDonated += donation.amount!;
      }
    }

  }

  donate() {
    this.donationViewsService.showDonationComponent.emit(true);
  }

}
