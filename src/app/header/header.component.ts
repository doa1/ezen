import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }
   logoutUser() {
     // clear the login details and reroute to login page
     const confirmation = confirm('Are you sure you want to end your session?');
     if (confirmation) {
       if (this.auth.getLogDetails().token) {
        this.auth.userLogOut();
        this.router.navigate(['login']);
       }
      }
   }
}
