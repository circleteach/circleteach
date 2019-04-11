import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { AuthenticationService } from '../authentication.service';
import { Users } from '../models/users.model';
import { User } from 'firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';




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
  //END Example Fields
  
  posts: postWithMeta[]; //Stores list of posts
  comments: Comment[]; //Stores list of comments per each post

  @Input('canwritepost') canWritePost: Boolean;   //Toggles write posts section
  @Input('activitylogview') activityLogView: Boolean; //Toggles Activity log view

  private isStared = false; //Have you starred the post
  private newPostInp; //Bound text field for write post
  private newCommentInp; //Bound text field for write comment
  private tagsInp; //Bound text filed for input of tags with post

  constructor(private postService: PostsService, private authService: AuthenticationService) { 
    console.log(this.canWritePost);
    console.log(this.activityLogView);
  }

  // Gets unfiltered list of all posts, proof of concept for subscribing to collection
  ngOnInit() {
    this.postService.getPosts().subscribe(data => { //This is how to get data from a collection
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as postWithMeta;
      });
      
      //Within the subscribe to getPosts(), i'm calling my seccond data retrieval function
      //in this forEach loop, getting a document for each post object
      this.posts.forEach(post => {
        this.getPostUser(post);
      });
    });
  }

  getPostUser(post:postWithMeta){
    let user: Users = new Users;
       this.postService.getPostUserData(post.id).pipe(map(action =>{  //This is how to get data from a document
        user = action.payload.data() as Users;
        user.id = action.payload.id;
      })).subscribe(f =>{
          post.name = user.name;
      });
  }

  //----------- Methods for Post Body ------------//

  //Adds or removes from posts star count, changes Icon appearance
  starClick(post: Post) {
    if(!this.isStared){
      post.stars += 1;
      this.postService.updatePost(post);
      this.isStared = true;
    }else if(this.isStared){
      post.stars -= 1;
      this.postService.updatePost(post);
      this.isStared = false;
    }
  }

  //Allows viewing of comments, opens comment creation UI
  commentClick(post: Post) {
      post.showComments = (!post.showComments);

      this.postService.getComments(post).subscribe(data => {
        this.comments = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Comment;
        });
      });
  }

  //TODO Uploads comment given body and user info
  submitCommentClick(post: Post){
    if(this.newCommentInp != "" && this.newCommentInp != null){
      let newComment: Comment = new Comment;
      newComment.content = this.newCommentInp;
      newComment.user = "Example User";

      this.postService.createComments(newComment,post);
      console.log("Uploaded new Comment");
      this.newCommentInp ="";
    }
  }

  // TODO downloads content of post
  downloadClick() {
  
  }

  // TODO Navigate to user page on profile image or name click
  profileClick() {

  }

  // TODO after tag functionality is built
  tagClick() {

  }

  // Methods for Post Creation

  // TODO Allows content to be uploaded to post
  uploadClick() {

  }

  //Validates content and creates a new post for the user
  //TODO: Linke to User, Tags
  postClick() {
    if(this.newPostInp != "" && this.newPostInp != null){
      let newPost = new Post;
      newPost.content = this.newPostInp;
      newPost.time = Date.now();
      newPost.user = this.authService.getUserId();
      newPost.showComments = false;
      newPost.stars = 0;

      this.postService.createPost(newPost);
      console.log("Uploaded Post");
      this.newPostInp = "";
    }

  }

  // TODO toggles the sort by options
  sortClick() {

  }

  // TODO toggles the posts by options
  postsByClick() {

  }

  //------------ Methods for Comments ------------//
}

class postWithMeta extends Post{
    public name: string;
    public profImg;
    public profInfo;
}
