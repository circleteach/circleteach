import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";

import { take } from "rxjs/operators";
import { User } from "./models/user.model";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private firebaseStorage: AngularFirestore,
    private firestore: AngularFirestore
  ) {}

  /// Use this if you want to listen to changes live
  // getUser(userID: string): DocumentReference {
  //   return this.firebaseStorage.firestore.collection("users").doc(userID);
  // }

  /// Use this if you want to listen to changes live
  getUser(userID: string) {
    return (
      this.firestore
        .collection("users")
        // .doc(userID)
        .snapshotChanges()
    );
  }

  // Set's up user's document in firestore
  setupUserDocument(userID: string, displayName: string) {
    // TODO Hook up signup to this
    this.firebaseStorage.firestore
      .collection("users")
      .doc(userID)
      .set({
        connections: [],
        groups: [],
        name: displayName,
        posts: [],
        professionalInfo: null,
        settings: null,
        starredPosts: []
      });
  }

  getDisplayName(userID: string): string {
    const docRef = this.firebaseStorage.firestore
      .collection("users")
      .doc(userID);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(doc.get("name:" + name));
          return doc.get("name");
        } else {
          console.log("No such document!");
        }
      })
      .catch(e => {
        console.log("Error getting document: ", e);
      });
    return "Missing Name";
  }

  getGroups(userID: string): DocumentReference[] {
    this.firebaseStorage.firestore
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().groups;
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document: ", error);
      });
    return [];
  }
}
