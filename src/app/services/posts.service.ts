import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentSnapshot,
  Action
} from "@angular/fire/firestore";
import { EMPTY, Observable } from "rxjs";
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private firestore: AngularFirestore) {}

  // CRUD Read
  getPosts() {
    return this.firestore.collection("posts").snapshotChanges();
  }

  getPostUserData(postId: string) {
    return this.firestore.doc("users/" + postId).snapshotChanges();
  }

  getPostProfessionalInfo(
    userID: string
  ): Observable<Action<DocumentSnapshot<any>>> {
    const doc = this.firestore.doc("professionalInfo/" + userID);
    if (doc == null || doc === undefined) {
      return EMPTY;
    }
    return doc.snapshotChanges();
  }

  // Subcollection get comments
  getComments(post: Post) {
    return this.firestore
      .collection("posts/" + post.id + "/comments")
      .snapshotChanges();
  }

  // CRUD Create
  createPost(post: Post) {
    const param = JSON.parse(JSON.stringify(post));
    return this.firestore.collection("posts").add(param);
  }

  // Add Comment to subcollection
  createComments(comment: Comment, post: Post) {
    const param = JSON.parse(JSON.stringify(comment));
    return this.firestore
      .collection("posts/" + post.id + "/comments")
      .add(param);
  }

  // CRUD Update
  updatePost(post: Post) {
    this.firestore.doc("posts/" + post.id).update(post);
  }

  // CRUD Delete
  deletePost(postId: string) {
    this.firestore.doc("posts/" + postId).delete();
  }
}
