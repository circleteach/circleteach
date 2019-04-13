import { Injectable } from "@angular/core";
import {EMPTY, Observable} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
  CollectionReference, DocumentSnapshot, Action
} from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private firestore: AngularFirestore
  ) {}

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
      .collection('users')
      .doc(userID)
      .get().then(doc => {
        if (doc.exists) {
          return doc.data().profileImage;
        } else {
          console.log("Failed to retrieve profile image url from user.");
          return null;
        }
      }).catch(error => {
        console.log("Failed to retrieve profile image url from user due to error.");
        return null;
      });
  }

  getDisplayName(userID: string): Promise<string | null> {
    return this.firestore.firestore
      .collection('users')
      .doc(userID)
      .get().then(doc => {
        if (doc.exists) {
          return doc.data().name;
        } else {
          console.log("Failed to retrieve display name from user.");
          return null;
        }
      }).catch(error => {
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

  getBasicInfo(userID: string) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .snapshotChanges();
  }

  getProfessionalInfo(userID: string): Observable<Action<DocumentSnapshot<any>>> {
    const doc = this.firestore.doc("professionalInfo/" + userID);
    if (doc == null || doc === undefined) {
      return EMPTY;
    }
    return doc.snapshotChanges();
  }

  /* // CRUD Read
    getUserDoc(userID: string) {
      return this.firebaseStorage.doc("users/" + userID).snapshotChanges();
    }
  */

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

  getJobInfo() {
    // TODO want "example" to be referencing the document ID that we pass will in
    console.log(this.firestore.doc("jobCollection/" + "example"));
    return this.firestore.doc("jobCollection/" + "example").snapshotChanges();
  }

  // getInfo(userID: string) {
  //   // this.firestore.ca
  //   this.firestore.child('users').orderByChild('user').equalTo(userID).on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //     snapshot.forEach(function(data) {
  //         console.log(data.key);
  //     });
  //   });
  // }



  // getPostUserData(postId: string){
  //   return this.firestore.doc("users/" + postId).snapshotChanges();
  // }

}
