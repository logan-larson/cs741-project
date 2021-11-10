import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
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
    private usersService: UsersService,
    private eventsService: EventsService
  ) {
    this.usersService.getCurrentUserEmitter
      .subscribe(() => {
        this.user = this.usersService.getUser();
      });

    this.eventsService.getSelectedEventEmitter
      .subscribe(() => {
        this.event = this.eventsService.getSelectedEvent();
      });
  }

  ngOnInit(): void {
    // TODO - For events
    // Given the user donationIds and event donationIds
    // Find the donations the user has made to the event
    // Add the amounts of those donations to this.amount


    // TODO - expand donor section to accomodate programs
  }

  donate() {
    this.donationViewsService.showDonationComponent.emit(true);
  }

}
