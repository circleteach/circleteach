import { Component, OnInit } from "@angular/core";
import { ProfileDetails } from "../models/profileDetails.model";
import { Job } from "../models/job.model";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormArrayName
} from "@angular/forms";

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

  orderForm: FormGroup;
  items: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.myForm = new FormGroup({
    //   name: new FormControl("Benedict"),
    //   email: new FormControl(""),
    //   message: new FormControl("")
    // });

    // this.myForm = this.fb.group({
    //   name: "Benedict",
    //   email: "",
    //   message: ""
    // });

    this.orderForm = this.fb.group({
      customerName: "",
      email: "",
      items: this.fb.array([this.createItem()])
    });
  }

  // create one
  createItem(): FormGroup {
    return this.fb.group({
      name: "",
      description: "",
      price: ""
    });
  }

  // add more
  addItem(): void {
    this.items = this.orderForm.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  onSubmit(form: FormGroup) {
    console.log("Valid?", form.valid); // true or false
    console.log("Name", form.value.name);
    console.log("Email", form.value.email);
    console.log("Message", form.value.message);
  }

  // addInput(divName) {
  //   if (this.counter == this.limit) {
  //     alert("You have reached the limit of adding " + this.counter + " inputs");
  //   } else {
  //     console.log(divName);
  //     var newdiv = document.createElement("div");
  //     //newdiv.className = "example-container";
  //     newdiv.setAttribute("appearance", "legacy");
  //     newdiv.innerHTML =
  //       "Certification " +
  //       (this.counter + 1) +
  //       " <input matInput placeholder='Enter Certification' [formControl]='loginEmail'/>";
  //     this.counter++;
  //   }
  // }
}
