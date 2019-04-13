import { Component, OnInit } from "@angular/core";
import { ProfileDetails } from "../models/profileDetails.model";
import { Job } from "../models/job.model";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormField,
  MatInput
} from "@angular/material";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"]
})
export class EditprofileComponent implements OnInit {
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
  counter = 1;
  limit = 5;
  constructor() {}

  ngOnInit() {}

  addInput(divName) {
    if (this.counter == this.limit) {
      alert("You have reached the limit of adding " + this.counter + " inputs");
    } else {
      console.log(divName);
      var newdiv = document.createElement("div");
      //newdiv.className = "example-container";
      // newdiv.setAttribute("class", "example-container");
      newdiv.innerHTML =
        "Certification " +
        (this.counter + 1) +
        " <mat-form-field appearance='legacy'><input matInput placeholder='Enter Certification' [formControl]='loginEmail'/></mat-form-field> ";
      document.getElementById(divName).appendChild(newdiv);
      this.counter++;
    }
  }
}
