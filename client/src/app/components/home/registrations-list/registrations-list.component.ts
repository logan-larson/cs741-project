import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/models/Registration';
import { User } from 'src/app/models/User';
import { RegistrationsService } from 'src/app/services/registrations.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css']
})
export class RegistrationsListComponent implements OnInit {

  user: User = {};
  activeRegs: Registration[] = [];
  inactiveRegs: Registration[] = [];

  constructor(
    private usersService: UsersService,
    private registrationsService: RegistrationsService
  ) {
    this.usersService.getCurrentUserEmitter.subscribe((user: User) => {
      this.user = user;
      this.getRegs();
    })
  }

  async ngOnInit() {
    this.user = this.usersService.getUser();
    this.activeRegs = await this.registrationsService.getUserActiveRegistrations(this.user.userId!);
    this.inactiveRegs = await this.registrationsService.getUserInactiveRegistrations(this.user.userId!);
  }

  async getRegs() {
    this.activeRegs = await this.registrationsService.getUserActiveRegistrations(this.user.userId!);
    this.inactiveRegs = await this.registrationsService.getUserInactiveRegistrations(this.user.userId!);
  }

  switchList(registration: Registration, isActive: boolean) {
    if (isActive) {
      this.activeRegs = this.activeRegs.filter(reg => reg != registration);
      this.inactiveRegs.push(registration);
    } else {
      this.activeRegs.push(registration);
      this.inactiveRegs = this.inactiveRegs.filter(reg => reg != registration);
    }
  }

}
