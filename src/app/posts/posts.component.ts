import { Component, OnInit, Input } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { TagsService } from "../services/tags.service";
import { Post } from "../models/post.model";
import { Tag } from "../models/tags.model";
import { Comment } from "../models/comment.model";
import { Timestamp } from "rxjs/internal/operators/timestamp";
import { AuthenticationService } from "../authentication.service";
import { Users } from "../models/users.model";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  

  posts: postWithMeta[]; // Stores list of posts
  comments: Comment[]; // Stores list of comments per each post
  selectedTags: Tag[] = []; //TAGS FROM THE TAGS COMPONENT

  tagEntry = new FormControl();
  private tags: Tag[] = []; //Array for tags to be added to a post
  addedTags: Tag[] = [];
  tagNames = new Array();

  filteredTags: Observable<string[]>;

  @Input("canwritepost") canWritePost: boolean; // Toggles write posts section
  @Input("activitylogview") activityLogView: boolean; // Toggles Activity log view

  private isStared = false; // Have you starred the post
  private newPostInp; // Bound text field for write post
  private newCommentInp; // Bound text field for write comment

  private tagsInp; // Bound text filed for input of tags with post


  constructor(
    private postService: PostsService,
    private authService: AuthenticationService,
    private tagService: TagsService
  ) {
    console.log(this.canWritePost);
    console.log(this.activityLogView);
  }

  // Gets unfiltered list of all posts, proof of concept for subscribing to collection
  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      // This is how to get data from a collection
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as postWithMeta;
      });

      // Within the subscribe to getPosts(), i'm calling my seccond data retrieval function
      // in this forEach loop, getting a document for each post object
      this.posts.forEach(post => {
        this.getPostUser(post);
      });
    });

    this.tagService.currentTags.subscribe(tags => this.selectedTags = tags); //SUBSCRIBES TO TAGS
    this.loadTags();
  }

  getPostUser(post: postWithMeta) {
    let user: Users = new Users();
    this.postService
      .getPostUserData(post.user)
      .pipe(
        map(action => {
          // This is how to get data from a document
          user = action.payload.data() as Users;
          // user.id = action.payload.id;
        })
      )
      .subscribe(f => {
        if (user !== undefined) {
          post.name = user.name;
        }
      });
  }

  // ----------- Methods for Post Body ------------//

  // Adds or removes from posts star count, changes Icon appearance
  starClick(post: Post) {
    if (!this.isStared) {
      post.stars += 1;
      this.postService.updatePost(post);
      this.isStared = true;
    } else if (this.isStared) {
      post.stars -= 1;
      this.postService.updatePost(post);
      this.isStared = false;
    }
  }

  

  // TODO downloads content of post
  downloadClick() {
    console.log(this.selectedTags);
  }

  // TODO Navigate to user page on profile image or name click
  profileClick() {}

  // TODO after tag functionality is built
  tagClick() {}

  // Methods for Post Creation

  // TODO Allows content to be uploaded to post
  uploadClick() {}

  // Validates content and creates a new post for the user
  // TODO: Linke to User, Tags
  postClick() {
    if (this.newPostInp !== "" && this.newPostInp != null) {
      const newPost = new Post();
      newPost.content = this.newPostInp;
      newPost.time = Date.now();
      newPost.user = this.authService.getUserId();
      newPost.showComments = false;
      newPost.stars = 0;
      newPost.tags = this.addedTags;

      this.postService.createPost(newPost);
      console.log("Uploaded Post");
      this.newPostInp = "";
    }
  }

  // TODO toggles the sort by options
  sortClick() {}

  // TODO toggles the posts by options
  postsByClick() {}

    // ------------ Methods for Comments ------------//

  // Allows viewing of comments, opens comment creation UI
  commentClick(post: Post) {
    post.showComments = !post.showComments;

    this.postService.getComments(post).subscribe(data => {
      this.comments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Comment;
      });
    });
  }

  // TODO Uploads comment given body and user info
  submitCommentClick(post: Post) {
    if (this.newCommentInp != "" && this.newCommentInp != null) {
      let newComment: Comment = new Comment();
      newComment.content = this.newCommentInp;
      newComment.user = "Example User";

      this.postService.createComments(newComment, post);
      console.log("Uploaded new Comment");
      this.newCommentInp = "";
    }
  }

 // ------------ Methods for Adding Tags ------------//

  remove(tag: Tag): void {
    const index = this.addedTags.indexOf(tag);

    if (index >= 0) {
      this.addedTags.splice(index, 1);
    }
  }

  private loadTags(){
    this.tagService.getTags().subscribe(data => {
      this.tags = data.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Tag;
      });

      this.tags.forEach(tag => {
        this.tagNames.push(tag.name);
      });
    });

    this.filteredTags = this.tagEntry.valueChanges.pipe(
      startWith(''),
      map(value => this.myFilter(value))
    );
  }

  private myFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagNames.filter(user => user.toLowerCase().includes(filterValue));
  }

  addTag() {
    let newTag = new Tag();

    if(this.tagNames.includes(this.tagEntry.value)){
      newTag.name = this.tagEntry.value;
      this.addedTags.push(newTag);
      console.log("Existing Tag Found, Added to Filter List");
    }else{
      newTag.name = this.tagEntry.value;
      this.tagService.createTag(newTag);
      this.addedTags.push(newTag);
      console.log("New Tag Created and Pushed to DB!");
    }
  }

}

class postWithMeta extends Post {
  public name: string;
  public profImg;
  public profInfo;
}
