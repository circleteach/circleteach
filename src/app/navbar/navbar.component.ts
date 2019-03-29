import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {StorageService} from '../storage.service';
import {EMPTY, empty, Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  profileURL: Observable<string | null>;
  url = '../../assets/img/circle-teach-logo.png';

  constructor(private auth: AuthenticationService, private storage: StorageService) { }

  ngOnInit() {
    if (this.auth.getIconUrl() == null) {
      this.profileURL = EMPTY;
    } else {
      this.profileURL = this.storage.getProfilePicture(this.auth.getIconUrl());
    }
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public showNotifications() {
    // TODO
  }

}
