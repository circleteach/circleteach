import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  isLoggedIn(): boolean {
    return this.userDetails != null; 
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    }) .then((res) => this.router.navigate(['/home']));
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    }).then((res) => this.router.navigate(['/home']));
  }

  /* If we ever want to add login with Google
  loginWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
  */

  logout() {
    return this.firebaseAuth.auth.signOut().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    }).then((res) => this.router.navigate(['/login']));
  }

  getIconUrl(): string {
    if (this.userDetails != null) {
      return this.userDetails.photoURL;
    } else {
      return null;
    }
  }

  getUserId(): string {
    return this.userDetails.uid;
  }

}
