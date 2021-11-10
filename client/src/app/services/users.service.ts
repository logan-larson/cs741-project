import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/User';
import { Event } from '../models/Event';
import { Observable, Subscription } from 'rxjs';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // When a component invokes a command that will change the user's contents server side
  // The component should signal this to let the service know it needs to get the updated user
  @Output() userUpdatedEmitter: EventEmitter<any> = new EventEmitter();
  @Output() userAndEventUpdatedEmitter: EventEmitter<any> = new EventEmitter();

  @Output() getCurrentUserEmitter: EventEmitter<any> = new EventEmitter();
  currentUser: User = {};

  constructor(
    private http: HttpClient,
    private eventsService: EventsService) {
    // Listen for emissions from userUpdatedEmitter
    // On change get the updated user from the server
    this.userUpdatedEmitter.subscribe(() => {
      this.getCurrentUser((updatedUser: User) => {
        this.currentUser = updatedUser;
        this.getCurrentUserEmitter.emit();
      })
    })

    this.userAndEventUpdatedEmitter.subscribe(() => {
      console.log("Caught it!");
      this.getCurrentUser((updatedUser: User) => {
        this.currentUser = updatedUser;
        this.eventsService.selectedEventUpdatedEmitter.emit();
      })
    })

  }

  create(user: User, cb: any): void {
    this.http.post<User>('/api/users', user)
      .subscribe(user => {
        cb(user);
      }, err => {
        console.log("Error in UsersService -> create");
      });
  }

  validate(username: string, password: string, cb: any): void {
    this.http.post<User>('/api/users/user', { username: username, password: password })
      .subscribe(user => {
        cb(user);
      }, err => {
        console.log("Error in UsersService -> validate");
      });
  }

  logout(user: User, cb: any): void {
    this.http.post<boolean>(`/api/users/user/${user.userId}`, {})
      .subscribe(success => {
        cb(success);
      }, err => {
        console.log("Error in UsersService -> logout");
      })
  }

  getCurrentUser(cb: any): void {
    this.http.get<User>(`/api/users/user`)
      .subscribe((user: User) => {
        this.currentUser = user;
        cb(user);
      })
  }

  getUser(): User {
    return this.currentUser;
  }
}
