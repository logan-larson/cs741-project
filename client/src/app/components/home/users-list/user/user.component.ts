import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = {};
  type: string = "";

  constructor() { }

  ngOnInit(): void {
    switch (this.user.type) {
      case "donor":
        this.type = "Donor";
        break;
      case "volunteer":
        this.type = "Volunteer";
        break;
      case "both":
        this.type = "Donor & Volunteer";
        break;
      case "admin":
        this.type = "Administrator";
        break;
    }
  }

  viewReport() {
    console.log("View report");
  }

}
