import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
// maybe later instead
import { AuthenticationService } from "../authentication.service";

@Injectable({
  providedIn: "root"
})
export class ProfileDetailsService {
  constructor(private firestore: AngularFirestore) {}

  // CRUD Read
  getProfileDetails() {
    // return this.firestore.collection("users").snapshotChanges();
  }
}
