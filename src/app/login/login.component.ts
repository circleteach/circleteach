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

  finalSignUp() {

  }
}
