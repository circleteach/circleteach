import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { UsersService } from "./users.service";
import { log } from "util";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private loggedInPreviously = false;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
    private userService: UsersService,
    private ngZone: NgZone
  ) {
    this.firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.user = firebaseAuth.authState;

    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        if (!this.loggedInPreviously) {
          if (this.router.url === '' || this.router.url === '/login' || this.router.url === '/signup') {
            this.ngZone.run(() => {
              this.router.navigate(['/home']);
            });
          }
          this.loggedInPreviously = true;
        }
      } else {
        this.userDetails = null;
        this.router.navigate(['/login']);
        this.loggedInPreviously = false;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.userDetails != null;
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        const errorCode = error.code;
        alert(error.message);
        return error.message;
      })
      .then(res => {
        if (this.isLoggedIn()) {
          this.ngZone.run(() => {
            this.router.navigate(["/home"]);
          });
        }
      });
  }

  signup(email: string, password: string, name: string) {
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        alert(error.message);
        return error.message;
      })
      .then(res => {
        res.user.updateProfile({ displayName: name, photoURL: null });
        this.userService.setupUserDocument(res.user.uid, name);
        this.userService.createProfessionalInfo(res.user.uid);
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .catch(error => {
            log(error.message);
          });
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
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
    if (this.isLoggedIn()) {
      return this.firebaseAuth.auth
        .signOut()
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          return error.message;
        })
        .then(res => {
          this.router.navigate(['/login']);
        });
    }
  }

  delete() {
    this.userDetails
      .delete()
      .then(() => {
        console.log("User successfully deleted!");
        // User deleted.
      })
      .catch(error => {
        console.log("An error happened deleting the user: " + error);
      });
  }

  getEmail(): string {
    return this.userDetails.email;
  }

  changePassword(newPassword: string) {
    const cpUser = firebase.auth().currentUser;
    return cpUser
      .updatePassword(newPassword)
      .then(res => this.router.navigate(["/home"]));
  }

  reAuthenticate(email: string, oldPassword: string): Observable<boolean> {
    const cpUser = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      oldPassword
    );
    // Observable to make sure reAuthentication is done
    return new Observable(observer => {
      cpUser
        .reauthenticateAndRetrieveDataWithCredential(credentials)
        .catch(error => {
          console.log(error.code);
          observer.error(error);
          observer.complete();
        })
        .then(res => {
          observer.next(true);
          observer.complete();
        });
    });
  }

  getIconUrl(): string {
    if (this.userDetails != null) {
      if (this.userDetails.photoURL !== "") {
        return this.userDetails.photoURL;
      }
    }
    return "gs://circle-teach.appspot.com/profile-pictures/default-profile-picture.png";
  }

  updateIconUrl(profileImage: string) {
    if (this.userDetails != null) {
      this.userDetails.updateProfile({ photoURL: profileImage });
      this.userService.setProfileImage(this.userDetails.uid, profileImage);
    }
  }

  getUserId(): string | null {
    if (this.userDetails != null) {
      return this.userDetails.uid;
    } else {
      return null;
    }
  }

  getDisplayName(): string {
    return this.userDetails.displayName;
  }
}
