import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/User';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() getCurrentUserEmitter: EventEmitter<any> = new EventEmitter();
  currentUser: User = {};

  constructor(private http: HttpClient) { }

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
