/**
 * Controls login and register page components
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  page: string = 'register';

  constructor() { }

  getPage(): string {
    return this.page;
  }

  setPage(page: string): void {
    this.page = page;
  }
}
