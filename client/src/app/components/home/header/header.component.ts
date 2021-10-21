import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() currentUser: User = {};

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  gotoLogin() {
    this.authService.setPage('login');
    this.router.navigateByUrl('auth');
  }

  gotoRegister() {
    this.authService.setPage('register');
    this.router.navigateByUrl('auth');
  }

  logout() {
    this.usersService.logout(this.currentUser, (success: boolean) => {
      if (success) {
        this.gotoLogin();
      }
    });
  }

}
