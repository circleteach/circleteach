import { Component, OnInit } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material";

@Component({
  selector: "app-mycircle",
  templateUrl: "./mycircle.component.html",
  styleUrls: ["./mycircle.component.scss"]
})
export class MycircleComponent implements OnInit {
  toggle: boolean = true;
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

  constructor() {}

  ngOnInit() {}

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
}
