import { Component, OnInit, Input } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material";
import { ProfileDetails } from "../models/profileDetails.model";
import { AuthenticationService } from "../authentication.service";
import { Job } from "../models/job.model";
import { UsersService } from "../users.service";
import { EMPTY, Observable, from } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { first, map, concat, flatMap, reduce, toArray } from "rxjs/operators";
import { Users } from "../models/users.model";
import { Data, ActivatedRoute } from "@angular/router";

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
  connectionNames: string[];

  institution = "";
  fieldsOfStudy = "";
  educationStart = "";
  educationEnd = "";
  educationDates = "";
  educationDescription = "";

  jobTitle = "";
  jobLocation = "";
  jobStart = "";
  jobEnd = "";
  jobDates = "";
  jobDescription = "";

  // other fields used
  toggle = true;
  edu_empty = true;
  job_empty = true;
  id;
  // Number of Education Entries and array to hold them
  educationNum;
  educationList: Job[];
  // Number of Job Entries and array to hold them
  jobNum;
  jobList: Job[];

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    // TODO: If you need to access the user, access it from auth service
  }
  ngOnInit() {
    // Set Correct ID
    this.setCorrectID();
    // Get Connections
    this.usersService
      .getBasicInfo(this.id)
      .pipe(first())
      .pipe(
        map(doc => {
          this.user = doc.payload.data() as Users;
          console.log("data: " + doc.payload.data());
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
        console.log("suck it");
        console.log(connections);
        this.connections = connections;
        console.log(connections);
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
          this.skills = this.info.skills;
          this.certifications = this.info.certifications;
          this.educationList = this.info.education;
          // Loop through Educations (only 1 right now)
          for (let entry in this.educationList) {
            console.log(entry);
            // Education Fields
            this.institution = this.educationList[entry].location;
            this.fieldsOfStudy = this.educationList[entry].fieldOfStudy;
            this.educationDescription = this.educationList[entry].description;
            if (
              this.educationDescription !== "" &&
              this.educationDescription !== undefined
            ) {
              this.edu_empty = false;
            }
            this.educationStart = this.educationList[entry].startTime;
            this.educationEnd = this.educationList[entry].endTime;
            this.educationDates = this.educationStart.concat(
              " - ",
              this.educationEnd
            );
          }
          this.jobList = this.info.jobHistory;
          // Loop through Experiences (only 1 right now)
          for (let entry in this.jobList) {
            console.log(entry);
            // Experience Fields
            this.jobTitle = this.jobList[entry].position;
            this.jobLocation = this.jobList[entry].location;
            this.jobDescription = this.jobList[entry].description;
            if (
              this.jobDescription !== "" &&
              this.jobDescription !== undefined
            ) {
              this.job_empty = false;
            }
            this.jobStart = this.jobList[entry].startTime;
            this.jobEnd = this.jobList[entry].endTime;
            this.jobDates = this.jobStart.concat(" - ", this.jobEnd);
          }
        });
    }
  }

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
  setCorrectID() {
    this.route.params.subscribe(params => {
      console.log(params); //log the entire params object
      console.log(params["id"]); //log the value of id
      if (this.authService.getUserId() == params["id"]) {
        this.id = this.authService.getUserId();
      } else {
        this.id = params["id"];
      }
    });
  }
}
