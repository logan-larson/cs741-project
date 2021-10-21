import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {

  currentUser: User = {};

  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser((user: User) => {
      this.currentUser = user;
    })
  }

  close() {
    this.closeEmitter.emit("close me");
  }

}
