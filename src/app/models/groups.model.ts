import * as firebase from 'firebase';

export class Groups {
  public content: string[];
  public messages: firebase.firestore.DocumentReference[];
}
