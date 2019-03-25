import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public showNotifications() {
    // TODO
  }

}
