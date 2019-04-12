import { Component, OnInit } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material";
import { ProfileDetails } from "../models/profileDetails.model";
import { AuthenticationService } from "../authentication.service";
import { Job } from "../models/job.model";
import { UsersService } from "../users.service";
import { EMPTY, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { map, concat } from "rxjs/operators";

@Component({
  selector: "app-mycircle",
  templateUrl: "./mycircle.component.html",
  styleUrls: ["./mycircle.component.scss"]
})
export class MycircleComponent implements OnInit {
  // Data Fields
  info: ProfileDetails = new ProfileDetails();
  job: Job = new Job();
  skills: string[];
  certifications: string[];

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
  id;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {
    // TODO: If you need to access the user, access it from auth service
  }
  ngOnInit() {
    // Get ID from auth
    if (this.authService.getUserId() != null) {
      this.id = this.authService.getUserId();
    }

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
        });
    }

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
        // Education Fields
        this.institution = this.job.location;
        this.fieldsOfStudy = this.job.fieldOfStudy;
        this.educationDescription = this.job.description;
        this.educationStart = this.job.startTime;
        this.educationEnd = this.job.endTime;
        this.educationDates = this.educationStart.concat(
          " - ",
          this.educationEnd
        );
        // Job Fields
        this.jobTitle = this.job.position;
        this.jobLocation = this.job.location;
        this.jobDescription = this.job.description;
        this.jobStart = this.job.startTime;
        this.jobEnd = this.job.endTime;
        this.jobDates = this.jobStart.concat(" - ", this.jobEnd);
      });
  }

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
}
