/**
 * Controls all requests related to users
 * Also controls current user, client-side state management
 */

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/User';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // When a component invokes a command that will change the user's contents server side
  // The component should signal this to let the service know it needs to get the updated user
  userUpdatedEmitter: EventEmitter<any> = new EventEmitter();
  userAndEventUpdatedEmitter: EventEmitter<any> = new EventEmitter();

  getCurrentUserEmitter: EventEmitter<any> = new EventEmitter();
  currentUser: User = {};
  private reportUser: User = {};

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
      this.getCurrentUser((updatedUser: User) => {
        this.currentUser = updatedUser;
        this.getCurrentUserEmitter.emit();
        this.eventsService.selectedEventUpdatedEmitter.emit();
      })
    })

  }

  setAndEmitCurrentUser(user: User) {
    this.currentUser = user;
    this.getCurrentUserEmitter.emit();
  }

  /**
   * User registers for an account
   */
  create(user: User, cb: any): void {
    this.http.post<User>('/api/users', user)
      .subscribe(user => {
        cb(user);
      }, err => {
        console.log("Error in UsersService -> create");
      });
  }

  /**
   * Validate user log in
   */
  validate(username: string, password: string, cb: any): void {
    this.http.post<User>('/api/users/user', { username: username, password: password })
      .subscribe(user => {
        this.setAndEmitCurrentUser(user);
        cb(user);
      }, err => {
        console.log("Error in UsersService -> validate");
      });
  }

  /**
   * Logout user 
   */
  logout(user: User, cb: any): void {
    this.http.post<boolean>(`/api/users/user/${user.userId}`, {})
      .subscribe(success => {
        cb(success);
      }, err => {
        console.log("Error in UsersService -> logout");
      })
  }

  /**
   * Gets the currently active user from the server
   */
  getCurrentUser(cb: any): void {
    this.http.get<User>(`/api/users/user`)
      .subscribe((user: User) => {
        this.currentUser = user;
        cb(user);
      })
  }

  /**
   * Components call this to get the current user
   */
  getUser(): User {
    return this.currentUser;
  }

  /**
   * Get all users in the system
   */
  async getAllUsers(): Promise<User[]> {
    return await this.http.get<User[]>(`/api/users`).toPromise();
  }

  /**
   * Activate/deactivate user account
   */
  async updateActive(userId: string) {
    await this.http.put(`/api/users/user/${userId}`, {}).toPromise();
  }

  /**
   * State management for user reports
   */
  getReportUser() {
    return this.reportUser;
  }

  setReportUser(user: User) {
    this.reportUser = user;
  }

}
