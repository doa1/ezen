import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../auth.guard';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authS: AuthService) { }

  ngOnInit() {
  }

}
