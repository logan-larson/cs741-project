/**
 * User component that shows related user data
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { ViewsService } from 'src/app/services/views/views.service';

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

  constructor(
    private usersService: UsersService,
    private viewsService: ViewsService
  ) {}

  /**
   * Set user type based on current user
   */
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

  /**
   * Show user report popup component
   */
  viewReport() {
    this.usersService.setReportUser(this.user);
    this.viewsService.showReportComponent.emit(true);
  }

  /**
   * Switch user from active to deactivated or vice versa
   */
  async changeActive() {
    await this.usersService.updateActive(this.user.userId!);
    this.updated.emit();
  }

}
