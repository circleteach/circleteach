import { Component, OnInit, Input } from "@angular/core";
import { ProfileDetailsService } from "../services/profile-details.service";
import { Users } from "../models/users.model";
import { StorageService } from "../storage.service";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Data } from "@angular/router";

@Component({
  selector: "app-basicinfo",
  templateUrl: "./basicinfo.component.html",
  styleUrls: ["./basicinfo.component.scss"]
})
export class BasicinfoComponent implements OnInit {
  // TODO Input Decorator once we get data model
  // Example Fields
  userTitle = "Example Grade Example at Example School";

  // Actual Data Fields
  userName;
  profileImg = "../../assets/img/default-profile-picture.png";
  id;
  friends = false; // TODO: implement functionality

  // testing things
  basics: Users[];
  stuff: Observable<any[]>;
  userDetails;
  test;

  private user: Observable<firebase.User>;
  //private ProfileDetailsService
  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {
    this.user = firebaseAuth.authState;
  }

  // Gets list of basic information for now
  ngOnInit() {
    // Get ID from auth
    this.id = this.authService.getUserId();
    // get display name from auth
    this.userName = this.authService.getDisplayName();

    let check = this.usersService.getProfessionalInfo(this.id);
    // printing false but should print true
    console.log(check instanceof Observable);
    // printing undefined
    console.log("check: " + check);

    // error thrown when subscribe is called
    this.usersService.getProfessionalInfo(this.id).subscribe(data => {
      console.log("data" + data.get());
      //snapshot.forEach(thing => {
      //console.log(thing.data());
    });
  }

  toggleFriend() {
    if (this.friends) {
      this.friends = false;
    } else {
      this.friends = true;
    }
  }
}
