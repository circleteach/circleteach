import { Time } from '@angular/common';
import * as firebase from 'firebase';

export class Post {
    public id: string;
    public attachments;
    public comments;
    public content;
    public stars: number;
    public tags;
    public time: firebase.firestore.Timestamp;
    public user: string;
}
