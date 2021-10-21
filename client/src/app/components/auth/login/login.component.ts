import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: string = "";
  @Input() password: string = "";

  constructor(private usersService: UsersService, private router: Router) { }

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

}
