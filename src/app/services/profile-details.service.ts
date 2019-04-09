import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { ProfileDetails } from "../models/profileDetails.model";

@Injectable({
  providedIn: "root"
})
export class ProfileDetailsService {
  constructor(private firestore: AngularFirestore) {}

  // CRUD Read
  getProfileDetails() {
    // returns an observable with document info and id associated

    // "example" for now.. but should be logged in user's ID
    return (
      this.firestore
        .collection("professionalInfo")
        // .doc("example")
        .snapshotChanges()
    );
  }
}
