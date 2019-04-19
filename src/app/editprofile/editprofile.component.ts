import { Component, OnInit } from "@angular/core";
import { ProfileDetails } from "../models/profileDetails.model";
import { Job } from "../models/job.model";
import { AuthenticationService } from "../authentication.service";
import { StorageService } from "../storage.service";
import { UsersService } from "../users.service";
import { EMPTY } from "rxjs";
import { Users } from "../models/users.model";
import { map } from "rxjs/operators";

import { FormGroup, FormArray, FormControl } from "@angular/forms";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"]
})
export class EditprofileComponent implements OnInit {
  // Data Fields
  info: ProfileDetails = new ProfileDetails();
  job: Job = new Job();
  profile: Users = new Users();
  skills = new Array();
  certifications = new Array();
  profileImg = "../../assets/img/default-profile-picture.png";

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

  userName;

  orderForm: FormGroup;
  items: FormArray;

  new_certification = new FormControl();
  new_skill = new FormControl();
  displayname = new FormControl();

  id;
  educationForm: FormGroup;
  experienceForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private usersService: UsersService,
    private storeageService: StorageService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    // Get ID from auth
    if (this.auth.getUserId() != null) {
      this.id = this.auth.getUserId();
      this.storeageService.getStorageFromLink(this.auth.getIconUrl()).then(result => {
        this.profileImg = result;
      });
    }
    // Get Display Name
    this.usersService.getDisplayName(this.id).then(result => {
      if (result != null) {
        this.userName = result;
      } else {
        console.log("Failed to get username in basic info!");
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
          console.log("HERE" + this.info.skills);
          if (this.info.skills !== undefined) {
            this.skills = this.info.skills;
          }
          if (this.info.certifications !== undefined) {
            this.certifications = this.info.certifications;
          }
        });
    }
    // Education Form
    this.educationForm = new FormGroup({
      institution_attended: new FormControl(),
      fields_of_study: new FormControl(),
      date_started: new FormControl(),
      date_ended: new FormControl(),
      description: new FormControl()
    });

    // Experience Form
    this.experienceForm = new FormGroup({
      jobTitle: new FormControl(),
      jobLocation: new FormControl(),
      jobStart: new FormControl(),
      jobEnd: new FormControl(),
      jobDescription: new FormControl()
    });
  }
  // Update Profile Picture
  updateProfilePicture(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    if (file == null) {
      this.snackbar.open("You must specify a proper picture to upload!", "X", {
        duration: 3000
      });
      return;
    }

    if (!(file && file.type.split('/')[0] === 'image')) {
      this.snackbar.open("You can only upload an image as your profile picture!", "X", {
        duration: 3000
      });
      return;
    }
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    this.storeageService.uploadProfilePicture(
      'profile-pictures/' + this.auth.getUserId() + extension,
      fileInputEvent
    ).then(url => {
      this.auth.updateIconUrl(url);
      this.storeageService.getStorageFromLink(url).then(result => {
        this.profileImg = result;
        this.snackbar.open("Successfully uploaded your new profile picture!", "X", {
          duration: 3000
        });
      });
    });
  }
  updateDisplayName() {
    if (this.displayname.value == null || this.displayname.value.length < 1) {
      this.snackbar.open("Your new display name must be at least 1 character!", "X", {
        duration: 3000
      });
      this.displayname = new FormControl();
      return;
    }
    this.profile.name = this.displayname.value;
    // update it to be displayed immediately
    this.userName = this.profile.name;
    // update the correct field in firebase
    this.usersService.updateBasicInfo(this.id, this.profile.name);
    // re-initializes the form
    this.displayname = new FormControl();
  }
  updateCertifications() {
    // adds it to certifications array to display
    this.certifications.push(this.new_certification.value);
    // make sure profileDetails object is updated
    this.info.certifications = this.certifications;
    // push new certification to firestore
    this.usersService.updateProfessionalInfo(this.info, this.id);
    // re-initializes the form
    this.new_certification = new FormControl();
  }
  updateSkills() {
    // adds it to skills array to display
    this.skills.push(this.new_skill.value);
    // make sure profileDetails object is updated
    this.info.skills = this.skills;
    // push new skill to firestore
    this.usersService.updateProfessionalInfo(this.info, this.id);
    // re-initializes the form
    this.new_skill = new FormControl();
  }
  // update firebase with info from education form
  updateEducation(form: FormGroup) {
    this.job.location = form.value.institution_attended;
    this.job.fieldOfStudy = form.value.fields_of_study;
    this.job.startTime = form.value.date_started;
    this.job.endTime = form.value.date_ended;
    this.job.description = form.value.description;
    console.log(this.job);
    if (this.job !== undefined) {
      this.info.education = new Array();
      this.info.education.push(this.job);
    } else {
      console.log("job object undefined");
    }
    // push new education or job to firestore
    this.usersService.updateProfessionalInfo(this.info, this.id);
    // re-initializes the form
    this.educationForm = new FormGroup({
      institution_attended: new FormControl(),
      fields_of_study: new FormControl(),
      date_started: new FormControl(),
      date_ended: new FormControl(),
      description: new FormControl()
    });
  }
  // update firebase with info from experience form
  updateExperience(form: FormGroup) {
    this.job.position = form.value.jobTitle;
    this.job.location = form.value.jobLocation;
    this.job.startTime = form.value.jobStart;
    this.job.endTime = form.value.jobEnd;
    this.job.description = form.value.jobDescription;
    console.log(this.job);
    if (this.job !== undefined) {
      this.info.jobHistory = new Array();
      this.info.jobHistory.push(this.job);
    } else {
      console.log("job object undefined");
    }
    // push new experience or job to firestore
    this.usersService.updateProfessionalInfo(this.info, this.id);
    // re-initializes the form
    this.experienceForm = new FormGroup({
      jobTitle: new FormControl(),
      jobLocation: new FormControl(),
      jobStart: new FormControl(),
      jobEnd: new FormControl(),
      jobDescription: new FormControl()
    });
  }
}
