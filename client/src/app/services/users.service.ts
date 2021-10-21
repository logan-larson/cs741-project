import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  create(user: User, cb: any): void {
    this.http.post<User>('/api/users', user)
      .subscribe(user => {
        cb(user);
      }, err => {
        console.log(err);
      });
  }

  validate(username: string, password: string, cb: any): void {
    this.http.post<User>('/api/users/user', { username: username, password: password })
      .subscribe(user => {
        cb(user);
      }, err => {
        console.log(err);
      });
  }
}
