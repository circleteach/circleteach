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
import { Job } from "../models/job.model";

@Component({
  selector: "app-basicinfo",
  templateUrl: "./basicinfo.component.html",
  styleUrls: ["./basicinfo.component.scss"]
})
export class BasicinfoComponent implements OnInit {
  job: Job = new Job();
  jobTitle = "";

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

  // private user: Observable<firebase.User>;
  // private ProfileDetailsService
  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {
    // TODO If you need user, access it from auth service
  }

  ngOnInit() {
    // Get ID from auth
    if (this.authService.getUserId() != null) {
      this.id = this.authService.getUserId();
    }

    this.userName = this.authService.getDisplayName();

    // // Get Display Name
    // this.usersService
    //   .getBasicInfo(this.id)
    //   .pipe(
    //     map(doc => {
    //       this.profile = doc.payload.data() as Users;
    //       console.log("data" + doc.payload.data());
    //     })
    //   )
    //   .subscribe(f => {
    //     this.userName = this.profile.name;
    //     console.log("userName: " + this.userName);
    //   });

    // Get Education and Experiences
    this.usersService
      .getJobInfo()
      .pipe(
        map(doc => {
          this.job = doc.payload.data() as Job;
          console.log("data: " + doc.payload.data());
        })
      )
      .subscribe(f => {
        // Job Title
        this.jobTitle = this.job.position;
      });
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
