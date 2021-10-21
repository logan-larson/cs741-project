import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: string = "";
  @Input() password: string = "";

  @Output() gotoRegisterEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.usersService.validate(this.username, this.password, (user: User) => {
      if (!user) {
        alert("Invalid username or password.");
        return;
      }
      this.router.navigateByUrl('home');
    })
  }

  gotoRegister() {
    this.authService.setPage('register');
    this.gotoRegisterEmitter.emit("goto register");
  }

  gotoHome() {
    this.router.navigateByUrl('home');
  }

}
