import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Event } from 'src/app/models/Event';
import { DonationsService } from 'src/app/services/donations.service';
import { ViewsService } from 'src/app/services/views/views.service';
import { Program } from 'src/app/models/Program';
import { Donation } from 'src/app/models/Donation';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-make-donation',
  templateUrl: './make-donation.component.html',
  styleUrls: ['./make-donation.component.css']
})
export class MakeDonationComponent implements OnInit {

  // OnInit get these from their respective services
  user?: User;
  event?: Event;

  // Input from user
  @Input() amount?: number;

  // Type of donation
  type: string = "unrestricted";

  constructor(
    private viewsService: ViewsService,
    private donationsService: DonationsService,
    private usersService: UsersService,
    private eventsService: EventsService,
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.getUser();
    this.event = this.eventsService.getSelectedEvent();
    this.type = this.donationsService.getType();
  }

  async donate(): Promise<void> {

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
    const donation: Donation = await this.donationsService.makeDonation(this.amount, this.user, this.type, this.event);
    // Signal to users and events service that the user and event has been updated
    //this.usersService.userUpdatedEmitter.emit();
    // I wish this elegant way would work
    // However the components that rely on these emissions
    // Require both updated user and updated event at the same time
    //this.eventsService.selectedEventUpdatedEmitter.emit();

    this.usersService.userAndEventUpdatedEmitter.emit();

    this.viewsService.showDonationComponent.emit(false);
  }

  cancel() {
    this.viewsService.showDonationComponent.emit(false);
  }

}
