import { BASE_URL_CONFIG } from './../config';
/**
 *  Service class for handling user authentication
 * author @ochieng on 21/09/2018 at 18:10
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router) {}
  userLogin(info) {
    return this.http
      .post(BASE_URL_CONFIG + 'auth/login', info)
      .pipe(map(result => result));
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    /* Retrieve the token for the user */
    return localStorage.getItem('token');
  }
  getLogDetails() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const companyId = localStorage.getItem('companyId');
    const username = localStorage.getItem('username');
    const landlordId = localStorage.getItem('landlordId');
    const email = localStorage.getItem('email');
    const details = {
      token: token,
      userId: userId,
      company: companyId,
      username: username,
      landlordId: landlordId,
      email: email
    };
    return details;
  }
  userLogOut() {
    /** Determin if the session object is empty and redirect necessarly */
    console.log(this.getLogDetails());
    if (this.getLogDetails()) {
      localStorage.clear();
      // this.router.navigate(['login']);
      console.log('loging out ...');
    }
  }
}
