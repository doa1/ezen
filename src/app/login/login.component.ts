/**
 * Component class for reactively creating login form, handle validation authentication
 */
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any = {};
  loginError = [];
  loginForm: FormGroup;
  submitted = false;
  fields: any = [];
  constructor(public authService: AuthService, public formBuilder: FormBuilder, public router: Router ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
       this.fields = this.loginForm.controls;
       console.log(this.loginError);
  }
  get f() {
    /// our getter for the form-controls
    return this.loginForm.controls;
  }
  doUserLogin() {
    /**
     * method to determine form validity, send the form data to the auth service, uses the returned observable to set the session
     */
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authService.userLogin(this.loginForm.value)
      .subscribe(result => {
        this.loginData = result;
        console.log(result);
        // we shall do whatever we want with the returned observable
        localStorage.setItem('token', this.loginData.token);
        localStorage.setItem('username', this.loginData.name);
        localStorage.setItem('userId', this.loginData.userId);
        localStorage.setItem('landlordId', this.loginData.landlordId);
        localStorage.setItem('companyId', this.loginData.companyId);
        let email =  this.loginData.email;
        if (typeof  email === 'undefined') {
            email = this.loginForm.value.username;
        }
        localStorage.setItem('email', email);
        // redirect to the index page
        this.router.navigate(['home']);
      },
        error => {
          console.log('Authentication Problem!!', error);
          // this.loginError.push(error);
          this.loginError = error;
        }
      );

  }
}
