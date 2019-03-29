import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profiledetails",
  templateUrl: "./profiledetails.component.html",
  styleUrls: ["./profiledetails.component.scss"]
})
export class ProfiledetailsComponent implements OnInit {
  certification = "Elementary Education (K-6)";
  certificationState = "Minnesota";
  certificationDate = "May 2018";

  institution = "University of Wisconsin-Madison";
  fieldsOfStudy = "Elementary Education, Spanish";
  datesEnrolled = "August 2015 - May 2019";
  description =
    "Learning Community freshman year: Inspired others to learn and create.";

  jobTitle = "First Grade Teacher";
  jobLocation = "Central Park Elementary School";
  jobDates = "August 2018 - Present";
  jobDescription = "Teaching math and reading to first grade students.";

  skill1 = "Guided Reading";
  skill2 = "Reciprical Teaching";
  skill3 = "Guided Math";

  constructor() {}

  ngOnInit() {}
}
