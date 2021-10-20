import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Input() username: string = "";
  @Input() password: string = "";

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
  }

  register() {
    this.usersService.create(this.username, this.password, (user: User) => {
      console.log(`Hello ${user.username}`);
      this.router.navigateByUrl('home');
    })
  }
}
