import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private firebaseStorage: AngularFirestore) {

  }

  // TODO - Modify other methods to use promise method like this
  getGroupName(groupID: string): Promise<string | null> {
    const docRef = this.firebaseStorage.firestore.collection('groups').doc(groupID);
    return docRef.get().then(doc => {
      if (doc.exists) {
        return doc.data().name;
      } else {
        console.log('No such document!');
        return null;
      }
    }).catch(e => {
      console.log('Error getting document: ', e);
      return null;
    });
  }

  /// Use this if you want to listen to changes live
  getName(groupID: string): string {
    const docRef = this.firebaseStorage.firestore.collection('groups').doc(groupID);
    docRef.get().then(doc => {
        if (doc.exists) {
          return doc.get('name');
        } else {
          console.log('No such document!');
        }
      }).catch(e => {
        console.log('Error getting document: ', e);
      });
    return "";
  }

  getMembers(groupID: string): string[] {
    this.firebaseStorage.firestore.collection('groups').doc(groupID).get().then(doc => {
      if (doc.exists) {
        return doc.data().members;
      } else {
        console.log('No such document!');
      }
    }).catch(error => {
      console.log('Error getting document: ', error);
    });
    return [];
  }

  getMessages(groupID: string): DocumentReference[] {
    this.firebaseStorage.firestore.collection('groups').doc(groupID).get().then(doc => {
      if (doc.exists) {
        return doc.data().messages;
      } else {
        console.log('No such document!');
      }
    }).catch(error => {
      console.log('Error getting document: ', error);
    });
    return [];
  }

}
