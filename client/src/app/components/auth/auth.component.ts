/**
 * Show either login or register component
 */

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  page: string = "register";

  constructor(private authService: AuthService) { }

  /**
   * Set the active component to the one selected
   */
  ngOnInit(): void {
    this.page = this.authService.getPage();
  }

}
