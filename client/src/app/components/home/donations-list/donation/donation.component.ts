import { Component, Input, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  @Input() donation: Donation = {};
  restricted: string = "Restricted";
  event: Event = {};

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    if (this.donation.isRestricted!) {
      this.restricted = "Restricted";
      
      this.eventsService.getEventById(this.donation.eventId!,
        (event: Event) => {
          this.event = event;
        });
    } else {
      this.restricted = "Unrestricted";
    }
  }

}
