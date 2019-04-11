import { Time } from '@angular/common';
import { Comment } from './comment.model'
import * as firebase from 'firebase';

export class Post {
    public id: string;
    public attachments;
    public comments;
    public content;
    public stars: number;
    public tags;
    public time: number;
    public user: string;
    public showComments: boolean;
}
