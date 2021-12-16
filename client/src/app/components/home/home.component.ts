/**
 * Controls the main view
 *  - Header
 *  - Side bar
 *  - Main list
 * Also houses all popup boxes
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { Program } from 'src/app/models/Program';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ViewsService } from 'src/app/services/views/views.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User = {};
  selectedEvent: Event = {};
  selectedProgram: Program = {};
  showAddEventComponent: boolean = false;
  showAddProgramComponent: boolean = false;
  showEventViewerComponent: boolean = false;
  showProgramViewerComponent: boolean = false;
  showMakeDonationComponent: boolean = false;
  showReportComponent: boolean = false;
  showHelpComponent: boolean = false;
  mainList: string = "events";

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private viewsService: ViewsService
  ) {
    this.usersService.getCurrentUserEmitter.subscribe(() => {
      this.usersService.getCurrentUser((user: User) => {
        this.currentUser = user;
      })
    });

    /* Show different components based on the views service */

    this.viewsService.showDonationComponent.subscribe((show: boolean) => {
      this.showMakeDonationComponent = show;
    });

    this.viewsService.showEventViewerComponent.subscribe((show: boolean) => {
      this.showEventViewerComponent = show;
    });

    this.viewsService.showAddEventComponent.subscribe((show: boolean) => {
      this.showAddEventComponent = show;
    })

    this.viewsService.mainList.subscribe((list: string) => {
      this.mainList = list;
    })

    this.viewsService.showReportComponent.subscribe((show: boolean) => {
      this.showReportComponent = show;
    })

    this.viewsService.showHelpComponent.subscribe((show: boolean) => {
      this.showHelpComponent = show;
    })
  }

  /**
   * Get the current user
   */
  ngOnInit(): void {
    this.usersService.getCurrentUser((user: User) => {
      this.usersService.getCurrentUserEmitter.emit("get user");
      this.currentUser = user;
    });
  }

  /**
   * Triggers showing the event viewer component
   * 
   * @param event 
   */
  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.showEventViewerComponent = true;
  }
}
