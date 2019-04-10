import { Component, OnInit } from "@angular/core";
import { ProfileDetailsService } from "../services/profile-details.service";
import { ProfileDetails } from "../models/profileDetails.model";
import { StorageService } from "../storage.service";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-personalinfo",
  templateUrl: "./personalinfo.component.html",
  styleUrls: ["./personalinfo.component.scss"]
})
export class PersonalinfoComponent implements OnInit {
  // TODO Input Decorator once we get data model

  // Example Fields
  friends = false;

  // get from users collection, professionalInfo field (use position with most recent endtime)
  userTitle = "Example Grade Example at Example School";

  // get from users collection
  userName = "jay";

  profileImg;

  // Actual Data Fields
  basics: ProfileDetails[];

  //private ProfileDetailsService
  constructor(
    private ProfileDetailsService: ProfileDetailsService,
    private auth: AuthenticationService
  ) {}

  // Gets list of basic information for now
  ngOnInit() {
    this.userName = this.auth.getUserId();
    console.log(this.auth.getIconUrl());
    this.profileImg = this.auth.getIconUrl();
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
