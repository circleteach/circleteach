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
  connectionsInfo: ProfileDetails = new ProfileDetails();
  job: Job = new Job();
  job_test: Job = new Job();
  user: Users = new Users();
  user1: Users = new Users();
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
  connectionEmpty = false;
  loggedInUser = false;
  profileImg = "../../assets/img/default-profile-picture.png";
  profileImage;
  connectionsList = new Array();
  connectionsPositions = [];
  connectionsLocations = [];
  connectionsProfilePics = [];
  connectionPositionIDs = [];
  connectionLocationIDs = [];

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
      // Reset Connections Lists
      this.connectionsList = new Array();
      this.connectionsLocations = [];
      this.connectionsPositions = [];
      this.connectionsProfilePics = [];
      this.connections = [];
      // Used to workaround Firebase retrieval order inconsistencies
      this.connectionPositionIDs = [];
      this.connectionLocationIDs = [];
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
            if (user !== undefined) {
              return from(user.connections);
            }
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
                  if ((doc.payload.data() as Users) !== undefined) {
                    return (doc.payload.data() as Users).name;
                  }
                })
              );
          })
        )
        .pipe(toArray())
        .subscribe(connections => {
          this.connections = connections;
        });

      // Get Connections Profile Pictures
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
            if (user !== undefined) {
              return from(user.connections);
            }
          })
        )
        .pipe(
          flatMap(userId => {
            return this.usersService
              .getBasicInfo(userId)
              .pipe(first())
              .pipe(
                map(doc => {
                  if ((doc.payload.data() as Users) !== undefined) {
                    return (doc.payload.data() as Users).profileImage;
                  }
                })
              );
          })
        )
        .pipe(toArray())
        .subscribe(images => {
          this.connectionsProfilePics = images;
          for (let i = 0; i < this.connectionsProfilePics.length; i++) {
            if (
              this.connectionsProfilePics[i] === undefined ||
              this.connectionsProfilePics[i] === "" ||
              this.connectionsProfilePics[i] === null
            ) {
              this.connectionsProfilePics[i] = this.profileImg;
            }
          }
        });

      // Get Connections Job Titles
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
            return this.usersService
              .getProfessionalInfo(userId)
              .pipe(first())
              .pipe(
                map(doc => {
                  if (doc.payload.data() !== undefined) {
                    this.connectionPositionIDs.push(doc.payload.id);
                    return (doc.payload.data() as ProfileDetails).jobHistory[0]
                      .position;
                  }
                })
              );
          })
        )
        .pipe(toArray())
        .subscribe(positions => {
          this.connectionsPositions = positions.slice(0);
          // Put Positions into Consistent Order with other info
          for (let i = 0; i < this.connectionsList.length; i++) {
            var person = this.connectionsList[i];
            for (let j = 0; j < this.connectionPositionIDs.length; j++) {
              if (this.connectionPositionIDs[j] === person) {
                // Swap IDs in Positions Array
                var temp = this.connectionPositionIDs[i];
                var realTemp = this.connectionsPositions[i];
                this.connectionPositionIDs[i] = this.connectionPositionIDs[j];
                this.connectionsPositions[i] = this.connectionsPositions[j];
                this.connectionPositionIDs[j] = temp;
                this.connectionsPositions[j] = realTemp;
              }
            }
          }
        });

      // Get Connections Job Locations
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
            return this.usersService
              .getProfessionalInfo(userId)
              .pipe(first())
              .pipe(
                map(doc => {
                  if (doc.payload.data() !== undefined) {
                    this.connectionLocationIDs.push(doc.payload.id);
                    return (doc.payload.data() as ProfileDetails).jobHistory[0]
                      .location;
                  }
                })
              );
          })
        )
        .pipe(toArray())
        .subscribe(locations => {
          // copy array
          this.connectionsLocations = locations.slice(0);
          // Put Locations into Consistent Order with other info
          for (let i = 0; i < this.connectionsList.length; i++) {
            var person = this.connectionsList[i];
            for (let j = 0; j < this.connectionLocationIDs.length; j++) {
              if (this.connectionLocationIDs[j] === person) {
                // Swap IDs in Locations Array
                var temp = this.connectionLocationIDs[i];
                var realTemp = this.connectionsLocations[i];
                this.connectionLocationIDs[i] = this.connectionLocationIDs[j];
                this.connectionsLocations[i] = this.connectionsLocations[j];
                this.connectionLocationIDs[j] = temp;
                this.connectionsLocations[j] = realTemp;
              }
            }
          }
        });

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
              if (this.info.education === undefined) {
                this.educationList = null;
                this.institution = null;
                this.fieldsOfStudy = null;
                this.educationDescription = null;
                this.eduEmpty = true;
                this.educationStart = null;
                this.educationEnd = null;
                this.educationDates = null;
              } else {
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
                  if (this.educationStart !== undefined) {
                    this.educationDates = this.educationStart.concat(
                      " - ",
                      this.educationEnd
                    );
                  }
                }
              }
              if (this.info.jobHistory === undefined) {
                this.jobTitle = null;
                this.jobLocation = null;
                this.jobDescription = null;
                this.jobEmpty = true;
                this.jobStart = null;
                this.jobEnd = null;
                this.jobDates = null;
              } else {
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
                  if (this.jobStart !== undefined) {
                    this.jobDates = this.jobStart.concat(" - ", this.jobEnd);
                  }
                }
              }
            } else {
              this.skills = null;
              this.certifications = null;
              this.jobTitle = null;
              this.jobLocation = null;
              this.jobDescription = null;
              this.jobEmpty = true;
              this.jobStart = null;
              this.jobEnd = null;
              this.jobDates = null;
              this.educationList = null;
              this.institution = null;
              this.fieldsOfStudy = null;
              this.educationDescription = null;
              this.eduEmpty = true;
              this.educationStart = null;
              this.educationEnd = null;
              this.educationDates = null;
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
    if (fullName.substr(0, fullName.indexOf(" ")) === "") {
      return fullName;
    } else {
      return fullName.substr(0, fullName.indexOf(" "));
    }
  }

  // ** Workaround function ** (Temporarily fixes connectionsLocations bug where order gets messed up after adding a connection who does not have an associated job location)
  // fixOrder(information: string[]): string[] {
  //   for (let i = 0; i < information.length; i++) {
  //     if (information[i] === undefined || information[i] === null) {
  //       this.connectionEmpty = true;
  //       information.push(information.shift());
  //       return information;
  //     } else {
  //       return information;
  //     }
  //   }
  // }
}
