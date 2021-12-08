import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { ViewsService } from 'src/app/services/views/views.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  @Input() user: User = {};
  message: string = "";

  constructor(
    private viewsService: ViewsService,
  ) { }

  ngOnInit(): void {

    if (!this.user) {
      // guest user help
      this.message = this.guestMessage();
    } else {
      switch (this.user.type) {
        case "both":
          // Volunteer and donor help
          this.message = this.volunteerMessage() + this.donorMessage();
          break;
        case "volunteer":
          // volunteer help
          this.message = this.volunteerMessage();
          break;
        case "donor":
          // donor help
          this.message = this.donorMessage();
          break;
        case "admin":
          // admin help
          this.message = this.adminMessage();
          break;
      }
    }
  }

  guestMessage(): string {
    return `\nAs a guest user, you are only allowed to view events.
    To gain access to other operations you must first be logged in. 
    If you have an account already, select 'Login' to go to the login screen. 
    Otherwise, select 'Register' to make a new account.`;
  }

  volunteerMessage(): string {
    return `\nAs a volunteer, you are able to register to volunteer for events and manage those registrations.
    To register for an event, select 'View Event Details' and find the 'Volunteer Section'. Select 'Register' to register for the event.
    Select 'My Registrations' to view and manage all your registrations. You can 'Cancel' and 'Re-register' for events as you please.`;
  }

  donorMessage(): string {
    return `\nAs a donor, you are able to make donations to an event, make donations to the organization and view all past donations.
    To make a donation to an event, select 'View Event Details' and find the 'Donor Section'. Select 'Donate' to donate to the event.
    To make a donation to the organization, select 'Make Donation' on the left. Select 'My Donations' to view your donation history.`;
  }

  adminMessage(): string {
    return `\nSelect 'Add Event' to add an event. In an event's event viewer, select 'Cancel' to cancel an event.
    In the 'Users List', select 'View Report' to view a user's activity or select 'Disable' to inhibit a user.`;
  }

  close() {
    this.viewsService.showHelpComponent.emit(false);
  }

}
