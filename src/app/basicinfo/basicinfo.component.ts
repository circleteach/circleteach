import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { ProfileDetails } from "../models/profileDetails.model";
import { Users } from "../models/users.model";
import { Job } from "../models/job.model";
import { map } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { StorageService } from "../storage.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-basicinfo",
  templateUrl: "./basicinfo.component.html",
  styleUrls: ["./basicinfo.component.scss"]
})
export class BasicinfoComponent implements OnInit {
  // Fields and Variables
  info: ProfileDetails = new ProfileDetails();
  user: Users = new Users();
  jobTitle = "";
  jobLocation = "";
  jobList: Job[];
  skills: string[];
  connections = new Array();
  profileImg = "../../assets/img/default-profile-picture.png";
  authUsersConnections; // Authenticated users connections
  userName;
  id;
  loggedInUser;
  authenticatedID;
  jobEmpty;
  friends;
  profileURL: string | null;

  constructor(
    private auth: AuthenticationService,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private storage: StorageService,
    private firebaseAuth: AngularFireAuth
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
      // get AuthID
      this.authenticatedID = this.auth.getUserId();
      // Checks if that ID is that of the logged in user
      this.isLoggedInUser();
      // Get Display Name
      this.usersService.getDisplayName(this.id).then(result => {
        if (result != null) {
          this.userName = result;
        } else {
          console.log("Failed to get username in basic info!");
        }
      });

      // Get AuthUser's Connections and Set friends boolean
      this.usersService.getConnections(this.authenticatedID).then(result => {
        if (result != null) {
          this.authUsersConnections = result;
          // Sets color of "Add to my circle button" on load
          this.friends = this.authUsersConnections.includes(this.id);
        } else {
          console.log("Failed to get username in basic info!");
        }
      });

      this.usersService.getProfileImage(this.id).then(result => {
        this.storage.getStorageFromLink(result).then(r => {
          this.profileImg = r;
        });
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
              if (this.info.jobHistory === undefined) {
                this.jobEmpty = true;
                this.jobTitle = null;
                this.jobLocation = null;
              } else {
                this.jobEmpty = false;
                this.jobList = this.info.jobHistory;
              }
              // Loop through Experiences (only 1 right now)
              for (const entry in this.jobList) {
                // Get Job Title
                this.jobTitle = this.jobList[entry].position;
                this.jobLocation = this.jobList[entry].location;
              }
            } else {
              this.jobEmpty = true;
              this.jobTitle = null;
              this.jobLocation = null;
            }
          });
      }
    });
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
      // "Unfollow"
      for (let i = this.authUsersConnections.length - 1; i >= 0; i--) {
        if (this.authUsersConnections[i] === this.id) {
          this.authUsersConnections.splice(i, 1);
          break;
        }
      }
      this.usersService.updateConnections(
        this.authenticatedID,
        this.authUsersConnections
      );
    } else {
      this.friends = true;
      // Follow
      this.authUsersConnections.push(this.id);
      this.usersService.updateConnections(
        this.authenticatedID,
        this.authUsersConnections
      );
    }
  }

  // Checks if a users profile page is being viewed by themselves
  isLoggedInUser() {
    if (this.id === this.authenticatedID) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
  }
}
