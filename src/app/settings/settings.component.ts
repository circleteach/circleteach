import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  logoutMessage = '';
  oldPassword = '';
  newPassword = '';
  newPasswordConfirm = '';
  userEmail = '';
  authCheck: object;

  constructor(private auth: AuthenticationService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.logoutMessage = '';
  }

  doLogout() {
    this.auth.logout();
    this.logoutMessage = this.auth.isLoggedIn ? 'Log Out Failed' : 'Log Out Successful';
  }


  changePass() {
    this.userEmail = this.auth.getEmail();
    this.authCheck = this.auth.reAuthenticate(this.userEmail, this.oldPassword);
    if(this.authCheck != null){
      if (this.newPassword != this.newPasswordConfirm){
        this.snackbar.open("PASSWORDS DO NOT MATCH!", 'X', { duration: 3000}); 
      }
      if (this.newPassword.length < 6){
        this.snackbar.open("PASSWORDS MUST BE AT LEAST 6 CHARACTERS!", 'X', { duration: 3000});
      }
      else{
        this.auth.changePassword(this.newPassword);
      }
    }
    else{
      this.snackbar.open("CURRENT PASSWORD IS INCORRECT", 'X', { duration: 3000});
    }
  }
}
