import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPassHide = true;
  loginEmail = new FormControl('', [Validators.required, Validators.email]);
  loginPassword = new FormControl('', [Validators.required]);

  signupFailed = false;
  signupPassHide = true;
  signupEmail = new FormControl('', [Validators.required, Validators.email]);
  signupPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  signupName = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.signupFailed = false;
  }

  getNameErrorMessage(): string {
    if (this.signupName.hasError('required')) {
      return 'You must enter an name!';
    } else if (this.signupName.hasError('minlength')) {
      return 'Your name must be at least two characters long!';
    } else if (this.signupName.errors != null) {
      return 'There was a problem with your display name!';
    } else {
      return '';
    }
  }

  getEmailErrorMessage(): string {
    if (this.signupEmail.hasError('required')) {
      return 'You must enter an email!';
    } else if (this.signupEmail.hasError('email')) {
      return 'Your email must be a valid email!';
    } else if (this.signupEmail.errors != null) {
      return 'There was a problem with your email!';
    } else {
      return '';
    }
  }

  getPasswordErrorMessage(): string {
    if (this.signupPassword.hasError('required')) {
      return 'You must enter a password!';
    } else if (this.signupPassword.hasError('minlength')) {
      return 'Your password must be at least 6 characters long!';
    } else if (this.signupPassword.errors != null) {
      return 'There was a problem with your password!';
    } else {
      return '';
    }
  }

  doSignup() {
    this.auth.signup(this.signupEmail.value, this.signupPassword.value, this.signupName.value);
    this.signupFailed = !this.auth.isLoggedIn();
  }

}
