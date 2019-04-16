import { Component, OnInit, Input } from "@angular/core";
import { Users } from "../models/users.model";
import { StorageService } from "../storage.service";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
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
  // Fields and Variables
  info: ProfileDetails = new ProfileDetails();
  jobTitle = "";
  jobLocation = "";
  jobNum;
  jobList: Job[];
  userName;
  profileImg = "../../assets/img/default-profile-picture.png";
  id;
  skills: string[];
  // TODO: implement friends functionality
  friends = false;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    // Get ID from auth
    if (this.authService.getUserId() != null) {
      this.id = this.authService.getUserId();
    }
    // Get Display Name
    this.usersService.getDisplayName(this.id).then(result => {
      if (result != null) {
        this.userName = result;
      } else {
        console.log("Failed to get username in basic info!");
      }
    });
    // Get Job Title and Job Location
    const snapshot = this.usersService.getProfessionalInfo(this.id);
    if (snapshot !== undefined) {
      snapshot
        .pipe(
          map(doc => {
            this.info = doc.payload.data() as ProfileDetails;
          })
        )
        .subscribe(f => {
          this.jobList = this.info.jobHistory;
          // Loop through Experiences (only 1 right now)
          for (let entry in this.jobList) {
            console.log(entry);
            // Get Job Title
            this.jobTitle = this.jobList[entry].position;
            this.jobLocation = this.jobList[entry].location;
          }
        });
    }
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
