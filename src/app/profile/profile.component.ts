import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  editProfileButton = true;
  id;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Set Correct ID
    this.setCorrectID();
  }
  // Used to find out if Edit Profile Button should be showed
  setCorrectID() {
    this.route.params.subscribe(params => {
      if (this.authService.getUserId() == params["id"]) {
        this.id = this.authService.getUserId();
      } else {
        this.id = params["id"];
        this.editProfileButton = false;
      }
    });
  }
}
