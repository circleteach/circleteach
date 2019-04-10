import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {StorageService} from '../storage.service';
import {EMPTY, empty, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  profileURL: Observable<string | null>;
  url = '../../assets/img/circle-teach-logo.png';

  constructor(private firebaseAuth: AngularFireAuth, private auth: AuthenticationService, private storage: StorageService) { }

  ngOnInit() {
    if (this.auth.getIconUrl() == null) {
      this.profileURL = EMPTY;
    } else {
      this.profileURL = this.storage.getStorageFromLink(this.auth.getIconUrl());
    }

    this.firebaseAuth.authState.subscribe(
      (user) => {
        if (user) {
          if (user.photoURL != null) {
            this.profileURL = this.storage.getStorageFromLink(user.photoURL);
          } else {
            this.profileURL = EMPTY;
          }
        } else {
          this.profileURL = EMPTY;
        }
      }
    );
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public showNotifications() {
    // TODO
  }

}
