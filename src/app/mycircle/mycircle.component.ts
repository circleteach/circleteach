import { Component, OnInit } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material";
import { ProfileDetailsService } from "../services/profile-details.service";
import { ProfileDetails } from "../models/profileDetails.model";

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

  // delete later, not sure best way to hold data (and it is only getting an empty object currently)
  profileDetails = ProfileDetails[0];
  profileDets: ProfileDetails[];
  items: Array<any>;

  constructor(private profileDetailsService: ProfileDetailsService) {}

  // Gets data from professionalInfo Collection (and jobCollection)

  ngOnInit() {
    // subscribe to observable which was returned
    this.profileDetailsService.getProfileDetails().subscribe(data => {
      this.profileDetails = data.map(item => {
        return {
          // just puts everything into an object
          // id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as ProfileDetails;
      });
      this.profileDetails = data;
      console.log(this.profileDetails);
    });
  }

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
}
