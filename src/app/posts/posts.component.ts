import { Component, OnInit, Input } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { Post } from "../models/post.model";
import { StorageService } from "../storage.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  // Example Fields
  userName = "Jay Example";
  userTitle = "Example grade Example at Example School";
  postAge = "2 Days ago";
  postContent =
    "Some days I just feel like, Example. Then I go Example and keep exampling myself. Everyday all day!";
  stars = 52;

  // Actual Data Fields
  posts: Post[];
  private isStared = false;
  canWritePost = true;

  constructor(private postService: PostsService) {}

  // Gets unfiltered list of all posts, proof of concept for subscribing to collection
  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Post;
      });
    });
  }

  // Methods for Post Body
  // TO FINISH Adds or removes from posts star count, changes Icon appearance
  starClick(post: Post) {
    post.stars += 1;
    this.postService.updatePost(post);
  }

  // TODO Allows viewing of comments, opens comment creation UI
  commentClick() {}

  // TODO downloads content of post
  downloadClick() {}

  // TODO Navigate to user page on profile image or name click
  profileClick() {}

  // TODO after tag functionality is built
  tagClick() {}

  // Methods for Post Creation

  // TODO Allows content to be uploaded to post
  uploadClick() {}

  // TODO Validates content and creates a new post for the user
  postClick() {}

  // TODO toggles the sort by options
  sortClick() {}

  // TODO toggles the posts by options
  postsByClick() {}
}
