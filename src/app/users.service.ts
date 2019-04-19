import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
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
  /// Called upon deletion of an account
  deleteUserDoc(userID: string) {
    return this.firestore.firestore
      .collection("users")
      .doc(userID)
      .delete()
      .then(function() {
        console.log("User doc successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing User doc: ", error);
      });
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
          const image = doc.data().profileImage;
          if (image == null) {
            return "gs://circle-teach.appspot.com/profile-pictures/default-profile-picture.png";
          }
          return image;
        } else {
          console.log("Failed to retrieve profile image url from user.");
          return "gs://circle-teach.appspot.com/profile-pictures/default-profile-picture.png";
        }
      })
      .catch(error => {
        console.log(
          "Failed to retrieve profile image url from user due to error."
        );
        return "gs://circle-teach.appspot.com/profile-pictures/default-profile-picture.png";
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

  // Get Connections
  getConnections(userID: string): Promise<string | null> {
    return this.firestore.firestore
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().connections;
        } else {
          console.log("Failed to retrieve connections from user.");
          return null;
        }
      })
      .catch(error => {
        console.log("Failed to retrieve connections from user due to error.");
        return null;
      });
  }

  // Add Connection to a Users Connections List
  updateConnections(loggedInUserID: string, connections: Array<String>) {
    return this.firestore
      .collection("users")
      .doc(loggedInUserID)
      .set({ connections: connections }, {merge: true});
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

  // called upon deletion of an account
  deleteProfessionalInfo(userID: string) {
    return this.firestore
      .doc("professionalInfo/" + userID)
      .delete()
      .then(function() {
        console.log("ProfessionalInfo doc successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing ProfessionalInfo doc: ", error);
      });
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

  getAllUsers() {
    return this.firestore.collection("users").snapshotChanges();
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
