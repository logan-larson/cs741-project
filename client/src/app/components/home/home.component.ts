import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User = {};
  selectedEvent: Event = {};
  showAddEventComponent: boolean = false;
  showEventViewerComponent: boolean = false;

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser((user: User) => {
      this.currentUser = user;
    });
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.showEventViewerComponent = true;
  }
}
