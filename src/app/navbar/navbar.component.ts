import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { StorageService } from "../storage.service";
import { EMPTY, empty, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  profileURL: string | null;
  url = "../../assets/img/circle-teach-logo.png";

  constructor(
    private firebaseAuth: AngularFireAuth,
    private auth: AuthenticationService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    if (this.auth.getIconUrl() == null) {
      this.profileURL = "../../assets/img/default-profile-picture.png";
    } else {
      this.storage.getStorageFromLink(this.auth.getIconUrl()).then(result => {
        if (result === "" || result === undefined) {
          this.profileURL = "../../assets/img/default-profile-picture.png";
        } else {
          this.profileURL = result;
        }
      });
    }

    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        if (user.photoURL != null) {
          this.storage.getStorageFromLink(user.photoURL).then(result => {
            if (result === "" || result === undefined) {
              this.profileURL = "../../assets/img/default-profile-picture.png";
            } else {
              this.profileURL = result;
            }
          });
        } else {
          this.profileURL = "../../assets/img/default-profile-picture.png";
        }
      } else {
        this.profileURL = "../../assets/img/default-profile-picture.png";
      }
    });
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public showNotifications() {
    // TODO
  }
}
