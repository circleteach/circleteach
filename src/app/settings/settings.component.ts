import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { MatSnackBar } from '@angular/material';
import { ObserversModule } from '@angular/cdk/observers';

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

    this.auth.reAuthenticate(this.userEmail, this.oldPassword).subscribe(
    success => {
      if(this.newPassword != this.newPasswordConfirm){
        this.snackbar.open("NEW PASSWORDS DO NOT MATCH", 'X', { duration: 3000});
      }
      else if(this.newPassword.length < 6){
        this.snackbar.open("PASSWORDS MUST BE AT LEAST 6 CHARACTERS", 'X', { duration: 3000});
      }
      else{
        this.snackbar.open("SUCCESS!", 'X', { duration: 3000});
        this.auth.changePassword(this.newPassword);
      }
    },
    error => { 
      this.snackbar.open("CURRENT PASSWORD IS INCORRECT", 'X', { duration: 3000}); }
    );
  }

}
