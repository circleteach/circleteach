import { Time } from '@angular/common';

export class Post {
    public id: string;
    public attatchments;
    public comments;
    public content;
    public stars: number;
    public tags;
    public time: Time;
    public user: string;
}
