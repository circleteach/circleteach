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
    return this.firestore.collection("professionalInfo").snapshotChanges();
  }
}
