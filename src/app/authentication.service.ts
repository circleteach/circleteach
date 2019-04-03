import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private userService: UsersService) {
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
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
      const errorCode = error.code;
      alert(error.message);
      return error.message;
    }).then((res) => this.router.navigate(['/home']));
  }

  signup(email: string, password: string, name: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      alert(error.message);
      return error.message;
    }).then((res) => {
      res.user.updateProfile({displayName: name, photoURL: null});
      this.userService.setupUserDocument(res.user.uid, name);
      this.router.navigate(['/home']);
    });
  }

  /* If we ever want to add login with Google
  loginWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
  */

  logout() {
    return this.firebaseAuth.auth.signOut().catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      return error.message;
    }).then((res) => this.router.navigate(['/login']));
  }

  getIconUrl(): string {
    if (this.userDetails != null) {
      if (this.userDetails.photoURL !== '') {
        return this.userDetails.photoURL;
      }
    }
    return null;
  }

  getUserId(): string {
    return this.userDetails.uid;
  }

}
