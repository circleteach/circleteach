import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
  CollectionReference
} from "@angular/fire/firestore";

import { take } from "rxjs/operators";
import { from } from "rxjs";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { validateBasis } from "@angular/flex-layout";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private firebaseStorage: AngularFirestore,
    private firestore: AngularFirestore
  ) {}

  /// Use this if you want to listen to changes live
  getUser(userID: string): DocumentReference {
    return this.firebaseStorage.firestore.collection("users").doc(userID);
  }

  /// Use this if you want to listen to changes live
  getUsers(userID: string) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .snapshotChanges();
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

  // getDisplayName(userID: string): string {
  //   const docRef = this.firebaseStorage.firestore
  //     .collection("users")
  //     .doc(userID);
  //   docRef
  //     .get()
  //     .then(doc => {
  //       if (doc.exists) {
  //         console.log(doc.get("name: " + name));
  //         return doc.get("name");
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch(e => {
  //       console.log("Error getting document: ", e);
  //     });
  //   return "Missing Name";
  // }

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

  // getProfessionalInfo(userID: string): Observable<DocumentReference> {
  //   var val;
  //   this.firebaseStorage.firestore
  //     .collection("users")
  //     .doc(userID)
  //     .get()
  //     .then(doc => {
  //       if (doc.exists) {
  //         console.log(new Observable(doc.data().professionalInfo));
  //         return new Observable(doc.data().professionalInfo);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch(error => {
  //       console.log("Error getting document: ", error);
  //     });
  //   return;
  // }

  getProfessionalInfo(userID: string): Observable<CollectionReference> {
    this.firebaseStorage.firestore
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.firebaseStorage.firestore
            .collection("users")
            .doc(userID)
            .onSnapshot(doc => {
              console.log(doc.data().professionalInfo);
              // return doc.data().professionalInfo;
              console.log(doc.data());
              return new Observable<CollectionReference>(
                doc.data().professionalInfo
              );
            });
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document: ", error);
      });
    return;
  }
}
