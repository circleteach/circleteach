import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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
  signupName = new FormControl('', [Validators.required]);

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.signupFailed = false;
  }

  getNameErrorMessage() {

  }

  getEmailErrorMessage() {

  }

  getPasswordErrorMessage() {

  }

  doSignup() {
    this.auth.signup(this.signupEmail.value, this.signupPassword.value, this.signupName.value);
    this.signupFailed = !this.auth.isLoggedIn();
  }

}
