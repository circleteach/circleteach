import { Time } from "@angular/common";
import * as firebase from "firebase";
import { ProfileDetails } from "./profileDetails.model";
import { Post } from "./post.model";

export class User {
  public connections: string;
  public groups;
  public name: string;
  public posts: Post[];
  public professionalInfo: ProfileDetails[];
  public settings;
  public starredPosts;
}
