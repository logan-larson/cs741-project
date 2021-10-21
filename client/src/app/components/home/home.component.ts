import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: String = "";
  userString: string = "user";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  gotoLogin() {
    this.authService.setPage('login');
    this.router.navigateByUrl('auth');
  }

  gotoRegister() {
    this.authService.setPage('register');
    this.router.navigateByUrl('auth');
  }

}
