import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  //Example Fields
  userName = 'Jay Example';
  userTitle = 'Example grade Example at Example School';
  postAge = '2 Days ago';
  postContent = 'Some days I just feel like, Example. Then I go Example and keep exampling myself. Everyday all day!';
  stars = 52;

  //Actual Data Fields
  private posts: Post[];

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Post;
      })
    });
  }


  
  starClick() {

  }

  commentClick() {

  }

  downloadClick() {

  }

  // Navigate to user page on profile image or name click
  profileClick() {

  }

  // TODO after tag functionality is built
  tagClick() {

  }
}
