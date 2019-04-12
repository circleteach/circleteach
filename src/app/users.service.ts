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
        profileImage: null,
        settings: null,
        starredPosts: []
      });
  }

  setProfileImage(userID: string, profileImageURL: string) {
    this.firebaseStorage.firestore
      .collection("users")
      .doc(userID)
      .update({
        profileImage: profileImageURL
      });
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

  getBasicInfo(userID: string) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .snapshotChanges();
  }

  getProfessionalInfo(userID: string) {
    return this.firestore.doc("professionalInfo/" + userID).snapshotChanges();
  }

  getJobInfo(userID: string) {
    console.log(this.firestore.collection("jobCollection", ref => ref.where('user', '==', userID)))
    return this.firestore.collection("jobCollection", ref => ref.where('user', '==', userID)).snapshotChanges();
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
