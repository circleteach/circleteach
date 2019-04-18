import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { ProfileDetails } from "../models/profileDetails.model";
import { Job } from "../models/job.model";
import { map } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { StorageService } from "../storage.service";

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
  jobList: Job[];
  skills: string[];
  profileImg = "../../assets/img/default-profile-picture.png";
  userName;
  id;
  jobEmpty = false;
  loggedInUser = false;

  // TODO: Implement friends functionality
  friends = false;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Combine them both into a single observable
    const urlParams = combineLatest(
      this.activeRoute.params,
      this.activeRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );
    // Subscribe to the single observable, giving us both
    urlParams.subscribe(routeParams => {
      // Use Correct ID of page being viewed
      this.id = routeParams.id;
      // Checks if that ID is that of the logged in user
      this.isLoggedInUser(this.id);
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
            if (this.info !== undefined) {
              this.jobList = this.info.jobHistory;
            }
            // Loop through Experiences (only 1 right now)
            for (let entry in this.jobList) {
              // Get Job Title
              this.jobTitle = this.jobList[entry].position;
              this.jobLocation = this.jobList[entry].location;
            }
            if (this.info.jobHistory === undefined) {
              this.jobEmpty = true;
            }
          });
      }
    });
  }

  // Toggles Friends button color
  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }

  // Checks if a users profile page is being viewed by themselves
  isLoggedInUser(id: string) {
    var logged_in = this.authService.getUserId();
    if (id === logged_in) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
  }
}
