import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DonationsService } from 'src/app/services/donations.service';
import { UsersService } from 'src/app/services/users.service';
import { ViewsService } from 'src/app/services/views/views.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() user: User = {};
  isUser: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private viewsService: ViewsService,
    private donationsService: DonationsService
  ) {
    this.usersService.getCurrentUserEmitter.subscribe(() => {
      this.user = this.usersService.getUser();
      if (Object.keys(this.user).length === 0) {
        this.isUser = false;
      } else {
        this.isUser = true;
      }
    })
  }

  ngOnInit(): void {
    this.user = this.usersService.getUser();
    if (Object.keys(this.user).length === 0) {
      this.isUser = false;
    } else {
      this.isUser = true;
    }
  }

  gotoLogin() {
    this.authService.setPage('login');
    this.router.navigateByUrl('auth');
  }

  gotoRegister() {
    this.authService.setPage('register');
    this.router.navigateByUrl('auth');
  }

  logout() {
    this.usersService.logout(this.user, (success: boolean) => {
      if (success) {
        this.gotoLogin();
      }
    });
  }

  // All users
  viewEvents() {
    this.viewsService.mainList.emit("events");
  }

  // Donor operations
  viewMyDonations() {
    this.viewsService.mainList.emit("myDonations");
  }

  makeDonation() {
    this.viewsService.showDonationComponent.emit(true);
    this.donationsService.setIsUnrestricted(true);
  }

  // Volunteer operations
  viewMyRegistrations() {
    this.viewsService.mainList.emit("myRegistrations");
  }

  // Admin operations
  addEvent() {
    this.viewsService.showAddEventComponent.emit(true);
  }

  viewUsers() {
    this.viewsService.mainList.emit("users");
  }

}
