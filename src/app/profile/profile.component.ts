import { Component, OnInit } from "@angular/core";
import { Data, ActivatedRoute } from "@angular/router";
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
  setCorrectID() {
    this.route.params.subscribe(params => {
      console.log(params); //log the entire params object
      console.log(params["id"]); //log the value of id
      if (this.authService.getUserId() == params["id"]) {
        this.id = this.authService.getUserId();
      } else {
        this.id = params["id"];
        this.editProfileButton = false;
      }
    });
  }
}
