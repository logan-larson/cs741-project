/**
 * List all users in the system
 */

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    // Get all users
    this.users = await this.usersService.getAllUsers();
  }

  /**
   * User(s) was updated
   * Get all the new updated users
   */
  async userUpdated() {
    // Get all users
    this.users = await this.usersService.getAllUsers();
  }

}
