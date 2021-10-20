import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string, cb: any) {
    // Encrypt password

    // Issue HTTP request to /api/auth/login
    this.http.post('/api', { username: username, password: password })
      .subscribe(() => {
        cb();
      })

  }
}
