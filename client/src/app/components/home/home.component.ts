import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: String = "";
  userString: string = "user";

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    /*
    this.userService.getUser(() => {
      console.log("Got user")
    });
    */
  }

}
