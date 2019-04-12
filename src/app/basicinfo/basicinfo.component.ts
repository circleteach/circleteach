import { Component, OnInit, Input } from "@angular/core";
import { Users } from "../models/users.model";
import { StorageService } from "../storage.service";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Data } from "@angular/router";
import { ProfileDetails } from "../models/profileDetails.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-basicinfo",
  templateUrl: "./basicinfo.component.html",
  styleUrls: ["./basicinfo.component.scss"]
})
export class BasicinfoComponent implements OnInit {
  // TODO Input Decorator once we get data model
  // Example Fields
  userTitle = "Example Grade Example at Example School";

  // Actual Data Fields
  userName;
  profileImg = "../../assets/img/default-profile-picture.png";
  id;
  skills: string[];
  friends = false; // TODO: implement functionality

  // testing things
  info: ProfileDetails = new ProfileDetails();
  profile: Users = new Users();
  userDetails;
  test;

  private user: Observable<firebase.User>;
  //private ProfileDetailsService
  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {
    this.user = firebaseAuth.authState;
  }

  ngOnInit() {
    // Get ID from auth
    this.id = this.authService.getUserId();

    // get userName
    this.usersService
      .getBasicInfo(this.id)
      .pipe(
        map(doc => {
          this.profile = doc.payload.data() as Users;
          console.log("data" + doc.payload.data());
        })
      )
      .subscribe(f => {
        this.userName = this.profile.name;
        console.log("userName: " + this.userName);
      });
  }

  // TODO get professionalInfo for current job title display

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
