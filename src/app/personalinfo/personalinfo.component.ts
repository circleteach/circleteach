import { Component, OnInit } from "@angular/core";
import { ProfileDetailsService } from "../services/profile-details.service";
import { User } from "../models/user.model";
import { StorageService } from "../storage.service";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Data } from "@angular/router";

@Component({
  selector: "app-personalinfo",
  templateUrl: "./personalinfo.component.html",
  styleUrls: ["./personalinfo.component.scss"]
})
export class PersonalinfoComponent implements OnInit {
  // TODO Input Decorator once we get data model

  // Example Fields
  friends = false;

  // get from users collection, professionalInfo field (use position with most recent endtime)
  userTitle = "Example Grade Example at Example School";

  // get from users collection
  userName = "jay";

  // default image.. will be overwritten
  profileImg = "../../assets/img/default-profile-picture.png";

  // Actual Data Fields
  basics: User[];
  stuff: Observable<any[]>;
  id;
  userDetails;
  test;

  private user: Observable<firebase.User>;
  //private ProfileDetailsService
  constructor(
    private ProfileDetailsService: ProfileDetailsService,
    private firebaseAuth: AngularFireAuth,
    private auth: AuthenticationService,
    private userService: UsersService
  ) {
    this.user = firebaseAuth.authState;
  }

  // Gets list of basic information for now
  ngOnInit() {
    // get id from authentication
    // could also use : this.id = this.user.getUser(this.id).id;
    this.id = this.auth.getUserId();
    // get display name using id

    // this.user.getDisplayName(this.id).subscribe(data => {
    //   this.userName = data;
    // }

    this.userDetails = this.userService.getUser(this.id);
    console.log(this.userDetails);

    // this.user.getUser(this.id).subscribe(data => {
    //   // this.test = data.payload.data();
    //   // console.log("test:" + this.test);
    //   // this.basics = data.map(e => {
    //   //   return {
    //   //     ...e.payload.doc.data()
    //   //   } as User;
    //   // });

    // });
    this.userService.getUser(this.id).subscribe(data => {
      this.basics = data.map(e => {
        return {
          // id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });

    console.log("basics:" + this.basics);

    //this.postService.getPosts().subscribe(data => {

    this.userName = this.userService.getDisplayName(this.id);

    console.log(this.userName);

    // not sure how to access profile image exac
    // this.profileImg = this.auth.getIconUrl();
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
