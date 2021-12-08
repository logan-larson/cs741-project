import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = {};
  @Output() updated: EventEmitter<any> = new EventEmitter();
  type: string = "";
  changeActiveText: string = "Disable";

  constructor(private usersService: UsersService) {}

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

    this.changeActiveText = this.user.isActive ? "Disable" : "Enable";
  }

  viewReport() {
    console.log("View report");
  }

  async changeActive() {
    await this.usersService.updateActive(this.user.userId!);
    this.updated.emit();
  }

}
