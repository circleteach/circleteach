import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Tag } from '../models/tags.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tagsSource = new BehaviorSubject<Tag[]>([]);
  currentTags = this.tagsSource.asObservable();

  constructor(private firestore: AngularFirestore) {}

  // CRUD Read
  getTags() {
    return this.firestore.collection("tags").snapshotChanges();
  }

  //CRUD Create
  createTag(tag: Tag) {
    const param = JSON.parse(JSON.stringify(tag));
    return this.firestore.collection("tags").add(param);
  }

  //RXJS Pipe for sending shit to posts component
  changeTags(tags: Tag[]) {
    this.tagsSource.next(tags)
  }
}
