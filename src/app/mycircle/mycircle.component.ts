import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatButtonToggleChange } from "@angular/material";
import { ProfileDetails } from "../models/profileDetails.model";
import { Users } from "../models/users.model";
import { Job } from "../models/job.model";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { first, map, flatMap, toArray } from "rxjs/operators";
import { EMPTY, from } from "rxjs";
import { combineLatest } from "rxjs";
import { StorageService } from "../storage.service";

@Component({
  selector: "app-mycircle",
  templateUrl: "./mycircle.component.html",
  styleUrls: ["./mycircle.component.scss"]
})
export class MycircleComponent implements OnInit {
  // Data Fields
  info: ProfileDetails = new ProfileDetails();
  job: Job = new Job();
  job_test: Job = new Job();
  user: Users = new Users();
  skills: string[];
  certifications: string[];
  connections: string[];
  jobTitles: string[];
  jobLocations: string[];
  connectionNames: string[];
  // Array to Hold Education Entries
  educationList: Job[];
  // Array to Hold Job Entries
  jobList: Job[];

  // Education Fields
  institution = "";
  fieldsOfStudy = "";
  educationStart = "";
  educationEnd = "";
  educationDates = "";
  educationDescription = "";

  // Job Fields
  jobTitle = "";
  jobLocation = "";
  jobStart = "";
  jobEnd = "";
  jobDates = "";
  jobDescription = "";

  // Other Fields and Booleans used
  userName;
  firstName;
  id;
  toggle = true;
  eduEmpty = true;
  jobEmpty = true;
  loggedInUser = false;
  profileImg = "../../assets/img/default-profile-picture.png";
  profileImage;
  connectionsList = new Array();

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private storage: StorageService
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
          this.userName = this.getFirstName(this.userName);
        } else {
          console.log("Failed to get username in basic info!");
        }
      });
      // Get Connections Display Names
      this.usersService
        .getBasicInfo(this.id)
        .pipe(first())
        .pipe(
          map(doc => {
            this.user = doc.payload.data() as Users;
            return this.user;
          })
        )
        .pipe(
          flatMap(user => {
            return from(user.connections);
          })
        )
        .pipe(
          flatMap(userId => {
            this.connectionsList.push(userId);
            return this.usersService
              .getBasicInfo(userId)
              .pipe(first())
              .pipe(
                map(doc => {
                  return (doc.payload.data() as Users).name;
                })
              );
          })
        )
        .pipe(toArray())
        .subscribe(connections => {
          this.connections = connections;
          // console.log(connections);
          // console.log(this.connectionsList);
        });

      // // Get ProfessionalInfo About Connections
      // this.usersService
      //   .getBasicInfo(this.id)
      //   .pipe(first())
      //   .pipe(
      //     map(doc => {
      //       this.user = doc.payload.data() as Users;
      //       return this.user;
      //     })
      //   )
      //   .pipe(
      //     flatMap(user => {
      //       return from(user.connections);
      //     })
      //   )
      //   .pipe(
      //     flatMap(userId => {
      //       console.log(userId);
      //       this.connectionsList.push(userId);
      //       return this.usersService
      //         .getProfessionalInfo(userId)
      //         .pipe(first())
      //         .pipe(
      //           map(doc => {
      //             return (doc.payload.data() as Users).name;
      //           })
      //         );
      //     })
      //   );
      // console.log(this.connectionsList);

      // .pipe(toArray())
      // .subscribe(connections => {
      //   this.connections = connections;
      //   console.log(connections);
      // });

      // Get Skills and Certifications
      const snapshot = this.usersService.getProfessionalInfo(this.id);
      if (snapshot !== EMPTY && snapshot !== undefined) {
        snapshot
          .pipe(
            map(doc => {
              this.info = doc.payload.data() as ProfileDetails;
            })
          )
          .subscribe(f => {
            if (this.info !== undefined) {
              this.skills = this.info.skills;
              this.certifications = this.info.certifications;
              this.educationList = this.info.education;
              this.jobList = this.info.jobHistory;
              // Loop through Educations (only 1 right now)
              for (let entry in this.educationList) {
                // Education Fields
                this.institution = this.educationList[entry].location;
                this.fieldsOfStudy = this.educationList[entry].fieldOfStudy;
                this.educationDescription = this.educationList[
                  entry
                ].description;
                if (
                  this.educationDescription !== "" &&
                  this.educationDescription !== undefined
                ) {
                  this.eduEmpty = false;
                }
                this.educationStart = this.educationList[entry].startTime;
                this.educationEnd = this.educationList[entry].endTime;
                this.educationDates = this.educationStart.concat(
                  " - ",
                  this.educationEnd
                );
              }
              // Loop through Experiences (only 1 right now)
              for (let entry in this.jobList) {
                // Experience Fields
                this.jobTitle = this.jobList[entry].position;
                this.jobLocation = this.jobList[entry].location;
                this.jobDescription = this.jobList[entry].description;
                if (
                  this.jobDescription !== "" &&
                  this.jobDescription !== undefined
                ) {
                  this.jobEmpty = false;
                }
                this.jobStart = this.jobList[entry].startTime;
                this.jobEnd = this.jobList[entry].endTime;
                this.jobDates = this.jobStart.concat(" - ", this.jobEnd);
              }
              if (this.info.education === undefined) {
                this.educationList = null;
                this.institution = null;
                this.fieldsOfStudy = null;
                this.educationDescription = null;
                this.eduEmpty = true;
                this.educationStart = null;
                this.educationEnd = null;
                this.educationDates = null;
              }
              if (this.info.jobHistory === undefined) {
                this.jobTitle = null;
                this.jobLocation = null;
                this.jobDescription = null;
                this.jobEmpty = true;
                this.jobStart = null;
                this.jobEnd = null;
                this.jobDates = null;
              }
            } else {
              this.skills = null;
              this.certifications = null;
            }
          });
      }
      this.usersService.getProfileImage(this.id).then(result => {
        this.storage.getStorageFromLink(result).then(r => {
          this.profileImage = r;
        });
      });
    });
  }

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
  // used when a profile is clicked on in connections to switch toggle back to profile
  changeToggle() {
    this.toggle = !this.toggle;
  }
  setCorrectID() {
    this.activeRoute.params.subscribe(params => {
      if (this.authService.getUserId() == params["id"]) {
        this.id = this.authService.getUserId();
      } else {
        this.id = params["id"];
      }
    });
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
  getFirstName(fullName: string) {
    return fullName.substr(0, fullName.indexOf(" "));
  }
}
