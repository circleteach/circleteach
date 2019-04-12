import { Component, OnInit } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material";
import { ProfileDetails } from "../models/profileDetails.model";
import { AuthenticationService } from "../authentication.service";
import { Users } from "../models/users.model";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Component({
  selector: "app-mycircle",
  templateUrl: "./mycircle.component.html",
  styleUrls: ["./mycircle.component.scss"]
})
export class MycircleComponent implements OnInit {
  // Example Fields
  certification = "K-6";
  certificationState = "Wisconsin";
  certificationDate = "May 2018";
  institution = "UW-Madison";
  fieldsOfStudy = "Elementary Education and Spanish";
  datesEnrolled = "August 2014 - May 2018";
  description = "Joined a couple clubs";

  jobTitle = "1st Grade Teacher";
  jobLocation = "Ridge Point Elementary";
  jobDates = "June 2018 - Present";
  jobDescription = "Teach kids how to read and write and do math and science";

  skill1 = "Guided Reading";
  skill2 = "Guided Math";
  skill3 = "Reading Circles";

  // Actual Data Fields
  toggle = true;
  id;
  info: ProfileDetails = new ProfileDetails();
  skills: string[];
  certifications: string[];

  private user: Observable<firebase.User>;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {
    this.user = firebaseAuth.authState;
  }

  // Gets data from professionalInfo Collection

  ngOnInit() {
    // Get ID from auth
    this.id = this.authService.getUserId();
    // get profile details
    this.usersService
      .getProfessionalInfo(this.id)
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

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
}
