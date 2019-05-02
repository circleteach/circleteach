import { Component, OnInit, Input } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { TagsService } from "../services/tags.service";
import { Post } from "../models/post.model";
import { Tag } from "../models/tags.model";
import { Comment } from "../models/comment.model";
import { Timestamp } from "rxjs/internal/operators/timestamp";
import { AuthenticationService } from "../authentication.service";
import { Users } from "../models/users.model";
import { UsersService } from "../users.service";
import { FormControl } from "@angular/forms";
import { Observable, empty } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { StorageService } from "../storage.service";
import { ProfileDetails } from "../models/profileDetails.model";
import * as moment from "moment";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  userID;
  profileImg = "../../assets/img/default-profile-picture.png";
  postImg = "../../assets/img/default-profile-picture.png";

  posts: postWithMeta[]; // Stores list of posts
  myPosts: postWithMeta[];//Posts you have made
  myPostsFiltered: postWithMeta[] = [];
  selectedTags: Tag[] = []; // TAGS FROM THE TAGS COMPONENT

  tagEntry = new FormControl();
  private tags: Tag[] = []; // Array for tags to be added to a post
  addedTags: Tag[] = [];
  tagNames = [];

  firstLoad = true;
  repeatGuard = true;

  filteredTags: Observable<string[]>;

  @Input("canwritepost") canWritePost: boolean; // Toggles write posts section
  @Input("activitylogview") activityLogView: boolean; // Toggles Activity log view
  @Input() public idProf;

  //private isStared = false; // Have you starred the post
  private newPostInp; // Bound text field for write post
  private newCommentInp; // Bound text field for write comment

  private tagsInp; // Bound text filed for input of tags with post

  constructor(
    private postService: PostsService,
    private authService: AuthenticationService,
    private usersService: UsersService,
    private tagService: TagsService,
    private storage: StorageService
  ) {}

  ngOnInit() {

    this.getPosts();
    this.loadTags();
    this.userID = this.authService.getUserId();
    this.usersService.getProfileImage(this.userID).then(result => {
      this.storage.getStorageFromLink(result).then(r => {
        this.profileImg = r;
      });
    });

    this.getMyPosts();
    console.log(this.canWritePost + " " + this.activityLogView);
  }

  getPosts() {
    // Gets unfiltered list of all posts, proof of concept for subscribing to collection
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
        this.getPostProfessionalInfo(post);
        post.showComments = false;
        // this.getPostProfilePic(post);

        //Load in Comments
        this.postService.getComments(post).subscribe(data => {
          post.comments = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Comment;
          });
        });
        
        this.updatePostDates(post);
        //this.setStar(post);
      });

      this.tagService.currentTags.subscribe(tags => {
        // SUBSCRIBES TO TAGS
        this.selectedTags = tags;
        if (!this.firstLoad) {
          if (tags[0].name !== "EMPTY") {
            this.filterByTags();
          } else if (tags[0].name === "EMPTY" && this.repeatGuard) {
            this.getPosts();
            this.repeatGuard = false;
          }
        }
      });
      //this.loadTags();
      this.firstLoad = false;
    });
  }

  getPostUser(post: postWithMeta) {
    let user: Users = new Users();
    this.postService
      .getPostUserData(post.user)
      .pipe(
        map(action => {
          // This is how to get data from a document
          user = action.payload.data() as Users;
        })
      )
      .subscribe(f => {
        if (user !== undefined) {
          post.name = user.name;
          if (user.profileImage !== undefined && user.profileImage !== null) {
            post.profImg = user.profileImage;
          } else {
            post.profImg = "../../assets/img/default-profile-picture.png";
          }
        }
      });
  }
  getPostProfessionalInfo(post: postWithMeta) {
    let postInfo: ProfileDetails = new ProfileDetails();
    this.postService
      .getPostProfessionalInfo(post.user)
      .pipe(
        map(action => {
          postInfo = action.payload.data() as ProfileDetails;
        })
      )
      .subscribe(f => {
        if (postInfo !== undefined) {
          post.profInfo =
            postInfo.jobHistory[0].position +
            " at " +
            postInfo.jobHistory[0].location;
        }
      });
  }
  updatePostDates(post: postWithMeta) {
    post.time = moment(parseInt(post.time)).fromNow();
    console.log(post.time);
  }

  // ------Methods for getting user posted posts -------//

  getMyPosts(){
    this.postService.getPosts().subscribe(data => {
      this.myPosts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as postWithMeta;
      });
      
      this.myPosts.forEach(post => {
        if (post.user == this.idProf){
          this.myPostsFiltered.push(post)
        }
      });

      this.myPostsFiltered.forEach(filt => {
        filt.showComments = false;
        this.getPostUser(filt);
        this.getPostProfessionalInfo(filt);
        this.updatePostDates(filt);
      });
      
    });
  }

  // ----------- Methods for Post Body ------------//

  // Sets star value for each post
  // setStar(post: postWithMeta) {
  //   if (
  //     post.starredUsers !== undefined &&
  //     post.starredUsers !== null &&
  //     post.starredUsers.includes(this.userID)
  //   ) {
  //     this.isStared = true;
  //   } else {
  //     this.isStared = false;
  //   }
  // }
  // Adds or removes from posts star count, changes Icon appearance
  starClick(post: postWithMeta) {
    post.stars += (post.isStarredByUser) ? -1 : 1;
    post.isStarredByUser = !post.isStarredByUser;

    const newPost = new Post();
    newPost.content = post.content;
    newPost.time = post.time;
    newPost.user = post.user;
    newPost.showComments = post.showComments;
    newPost.stars = post.stars;
    newPost.tags = post.tags;
    this.postService.updatePost(newPost);

    // if (!this.isStared) {
    //   post.stars += 1;
    //   this.postService.updatePost(post);
    //   this.isStared = true;
    // } else if (this.isStared) {
    //   post.stars -= 1;
    //   this.postService.updatePost(post);
    //   this.isStared = false;
    // }
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
      newPost.time = Date.now().toString();
      console.log(newPost.time);
      newPost.user = this.authService.getUserId();
      newPost.showComments = false;
      newPost.stars = 0;
      newPost.tags = this.addedTags;
      // creates the field in firebase at least
      newPost.starredUsers.push("");
      this.postService.createPost(newPost);
      console.log("Uploaded Post");
      this.newPostInp = "";
      this.addedTags = [];
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
  }

  // TODO Uploads comment given body and user info
  submitCommentClick(post: Post) {
    if (this.newCommentInp !== "" && this.newCommentInp != null) {
      const newComment: Comment = new Comment();
      newComment.content = this.newCommentInp;
      // authenticated user
      newComment.user = this.authService.getDisplayName();
      if (
        this.authService.getIconUrl() !== null &&
        this.authService.getIconUrl() !== undefined
      ) {
        newComment.profileImg = this.authService.getIconUrl();
      } else {
        newComment.profileImg = "../../assets/img/default-profile-picture.png";
      }
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

  private loadTags() {
    this.tagService.getTags().subscribe(data => {
      this.tags = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Tag;
      });

      this.tags.forEach(tag => {
        this.tagNames.push(tag.name);
      });
    });

    this.filteredTags = this.tagEntry.valueChanges.pipe(
      startWith(""),
      map(value => this.myFilter(value))
    );

    
  }

  private myFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagNames.filter(name =>
      name.toLowerCase().includes(filterValue)
    );
  }

  addTag() {
    const newTag = new Tag();

    if (this.tagNames.includes(this.tagEntry.value)) {
      newTag.name = this.tagEntry.value;
      this.addedTags.push(newTag);
      console.log("Existing Tag Found, Added to Filter List");
    } else {
      if(this.tagEntry !== null){
        newTag.name = this.tagEntry.value;
      this.tagService.createTag(newTag);
      this.addedTags.push(newTag);
      console.log("New Tag Created and Pushed to DB!");
      }
    }
  }

  // Filters Posts when a new tag is added
  private filterByTags() {
    const newPosts: postWithMeta[] = [];

    this.posts.forEach(post => {
      post.tags.forEach(tag => {
        this.selectedTags.forEach(tagS => {
          if (tag.name == tagS.name) {
            newPosts.push(post);
          }
        });
      });
    });

    this.posts = newPosts;
    this.repeatGuard = true;
  }
}

class postWithMeta extends Post {
  public name: string;
  public profImg;
  public profInfo;
  public isStarredByUser;
  public showComments;
  public comments: Comment[] = [];
}
