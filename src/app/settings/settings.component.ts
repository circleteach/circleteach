import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  logoutMessage = '';

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.logoutMessage = '';
  }

  doLogout() {
    this.auth.logout();
    this.logoutMessage = this.auth.isLoggedIn ? 'Log Out Failed' : 'Log Out Successful';
  }

}
