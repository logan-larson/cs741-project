import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { DonationViewsService } from 'src/app/services/views/donation-views.service';

@Component({
  selector: 'app-donor-section',
  templateUrl: './donor-section.component.html',
  styleUrls: ['./donor-section.component.css']
})
export class DonorSectionComponent implements OnInit {

  @Input() user: User = {};
  @Input() event: Event = {};

  @Output() showDonationComponent: EventEmitter<boolean> = new EventEmitter();

  amountDonated: number = 0;

  constructor(private donationViewsService: DonationViewsService) { }

  ngOnInit(): void {
  }

  donate() {
    this.donationViewsService.showDonationComponent.emit(true);
  }

}
