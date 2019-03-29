import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: AngularFirestore) { }

  //CRUD Read
  getPosts() {
    return this.firestore.collection('posts').snapshotChanges();
  }

  //CRUD Create
  createPost(post: Post){
    return this.firestore.collection('posts').add(post);
  }

  //CRUD Update
  updatePost(post: Post){
    this.firestore.doc('posts/' + post.id).update(post);
  } 
  
  //CRUD Delete
  deletePost(postId: string){
    this.firestore.doc('posts/' + postId).delete();
  }
}
