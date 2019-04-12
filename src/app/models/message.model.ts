import * as firebase from 'firebase';

export class Message {
  public content: string;
  public times: firebase.firestore.Timestamp;
  public user: string;
}
