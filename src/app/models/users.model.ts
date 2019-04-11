import * as firebase from 'firebase';

export class Users {
  public connections: string[];
  public groups: firebase.firestore.DocumentReference[];
  public name: string;
  public posts: firebase.firestore.DocumentReference[];
  public professionalInfo: firebase.firestore.DocumentReference;
  public starredPosts: firebase.firestore.DocumentReference[];
}
