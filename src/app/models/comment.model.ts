import { Time } from "@angular/common";
import * as firebase from "firebase";

export class Comment {
  public id: string;
  public user: string;
  public profileImg: string;
  public content: string;
}
