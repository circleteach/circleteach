import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLoggedIn(): boolean {
    // Set this to true to default to logged in and show feed
    // Set this to false if you want to go to the login page
    return true; // TODO Get this actually working
  }

}
