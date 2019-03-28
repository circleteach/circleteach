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
    // return this.userDetails != null; TODO Uncomment this once can signup and login
    // Set this to true to default to logged in and show feed
    // Set this to false if you want to go to the login page
    return true; // TODO Get this actually working
  }

  login(email: string, password: string) {
    // const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return firebase.auth().signInWithEmailAndPassword(email, password);
      /*.catch(error => {
        // const errorCode = error.code;
        return error.message;
      });*/
  }

  /* If we ever want to add login with Google
  loginWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
  */

  logout() {
    this.firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }

  getIconUrl(): string {
    if (this.userDetails != null) {
      return this.userDetails.photoURL;
    } else {
      return null;
    }
  }

}
