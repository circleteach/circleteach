import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { Certification } from "./models/certifications.model";
import { ProfileDetails } from "./models/profileDetails.model";
import { Job } from "./models/job.model";
import { Users } from "./models/users.model";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
  CollectionReference,
  DocumentSnapshot,
  Action
} from "@angular/fire/firestore";

import { take } from "rxjs/operators";
import { from } from "rxjs";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { validateBasis } from "@angular/flex-layout";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  /// Use this if you want to listen to changes live
  getUserDoc(userID: string): DocumentReference {
    return this.firestore.firestore.collection("users").doc(userID);
  }

  // Set's up user's document in firestore
  setupUserDocument(userID: string, displayName: string) {
    this.firestore.firestore
      .collection("users")
      .doc(userID)
      .set({
        connections: [],
        groups: [],
        name: displayName,
        posts: [],
        professionalInfo: null,
        profileImage: null,
        settings: null,
        starredPosts: []
      });
  }

  setProfileImage(userID: string, profileImageURL: string): Promise<any> {
    return this.firestore.firestore
      .collection("users")
      .doc(userID)
      .update({
        profileImage: profileImageURL
      });
  }

  getProfileImage(userID: string): Promise<string | null> {
    return this.firestore.firestore
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().profileImage;
        } else {
          console.log("Failed to retrieve profile image url from user.");
          return null;
        }
      })
      .catch(error => {
        console.log(
          "Failed to retrieve profile image url from user due to error."
        );
        return null;
      });
  }

  getDisplayName(userID: string): Promise<string | null> {
    return this.firestore.firestore
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().name;
        } else {
          console.log("Failed to retrieve display name from user.");
          return null;
        }
      })
      .catch(error => {
        console.log("Failed to retrieve display name from user due to error.");
        return null;
      });
  }

  getGroups(userID: string): DocumentReference[] {
    this.firestore.firestore
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

  getProfessionalInfo(
    userID: string
  ): Observable<Action<DocumentSnapshot<any>>> {
    const doc = this.firestore.doc("professionalInfo/" + userID);
    if (doc == null || doc === undefined) {
      return EMPTY;
    }
    return doc.snapshotChanges();
  }
  // Add certification or skill to subcollection
  updateProfessionalInfo(professionalInfo: ProfileDetails, userID: string) {
    const param = JSON.parse(JSON.stringify(professionalInfo));
    return this.firestore.doc("professionalInfo/" + userID).update(param);
  }

  // create ProfessionalInfo document for new user
  createProfessionalInfo(userID: string) {
    return this.firestore
      .collection("professionalInfo")
      .doc(userID)
      .set({ exists: true });
  }

  // Add certification or skill to subcollection
  updateJobInfo(job: Job, professionalInfo: ProfileDetails, userID: string) {
    return this.firestore
      .doc("professionalInfo/" + userID)
      .update(professionalInfo);
  }
  // Get basic user information
  getBasicInfo(userID: string) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .snapshotChanges();
  }

  // Update basic user information (Display Name)
  updateBasicInfo(userID: string, name: string) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .set(
        {
          name: name
        },
        { merge: true }
      );
  }

  getGroupsSnapshot(userID: string) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .snapshotChanges();
  }

  getUser(userID: string): Observable<Action<DocumentSnapshot<any>>> {
    return this.firestore
      .collection("users")
      .doc(userID)
      .snapshotChanges();
  }

  // getInfo(userID: string) {
  //   // this.firestore.ca
  //   this.firestore.child('users').orderByChild('user').equalTo(userID).on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //     snapshot.forEach(function(data) {
  //         console.log(data.key);
  //     });
  //   });
  //}

  // getPostUserData(postId: string){
  //   return this.firestore.doc("users/" + postId).snapshotChanges();
  // }
}
