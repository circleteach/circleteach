import * as firebase from 'firebase';

export class Group {
  public members: string[];
  public messages: firebase.firestore.DocumentReference[];
  public name: string;
}
