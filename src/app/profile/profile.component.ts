import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { combineLatest } from "rxjs";

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
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Combine them both into a single observable
    const urlParams = combineLatest(
      this.activeRoute.params,
      this.activeRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );
    // Subscribe to the single observable, giving us both
    urlParams.subscribe(routeParams => {
      // Use Correct ID of page being viewed
      this.id = routeParams.id;
      // Set Correct ID
      this.setCorrectID();
    });
  }

  // Used to find out if Edit Profile Button should be showed
  setCorrectID() {
    if (this.authService.getUserId() === this.id) {
      this.editProfileButton = true;
    } else {
      this.editProfileButton = false;
    }
  }
}
