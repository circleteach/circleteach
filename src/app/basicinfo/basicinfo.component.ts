import { Component, OnInit } from "@angular/core";
import { ProfileDetailsService } from "../services/profile-details.service";
import { Users } from "../models/users.model";
import { StorageService } from "../storage.service";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Data } from "@angular/router";

@Component({
  selector: "app-basicinfo",
  templateUrl: "./basicinfo.component.html",
  styleUrls: ["./basicinfo.component.scss"]
})
export class BasicinfoComponent implements OnInit {
  // TODO Input Decorator once we get data model

  // Example Fields
  friends = false;
  userTitle = "Example Grade Example at Example School";
  userName = "jay";
  // Default Picture
  profileImg = "../../assets/img/default-profile-picture.png";
  // Actual Data Fields
  basics: Users[];
  stuff: Observable<any[]>;
  id;
  userDetails;
  test;

  private user: Observable<firebase.User>;
  //private ProfileDetailsService
  constructor(
    private ProfileDetailsService: ProfileDetailsService,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private userService: UsersService
  ) {
    this.user = firebaseAuth.authState;
  }

  // Gets list of basic information for now
  ngOnInit() {
    // get id from authentication... could also use : this.id = this.user.getUser(this.id).id;
    this.id = this.authService.getUserId();
    console.log("id: " + this.id);

    // this.user.getDisplayName(this.id).subscribe(data => {
    //   this.userName = data;
    // }

    this.userDetails = this.userService.getUser(this.id);
    console.log("userDetails: " + this.userDetails);

    // this.user.getUser(this.id).subscribe(data => {
    //   // this.test = data.payload.data();
    //   // console.log("test:" + this.test);
    //   // this.basics = data.map(e => {
    //   //   return {
    //   //     ...e.payload.doc.data()
    //   //   } as User;
    //   // });

    // });

    this.userDetails = this.userService.getDisplayName(this.id);
    console.log("dets: " + this.userDetails);

    console.log("userName: " + this.userName);
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
