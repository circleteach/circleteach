import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(private auth: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  public onSidenavClose(profile: boolean) {
    if (profile) {
      this.router.navigate(['/profile/' + this.auth.getUserId()]);
    }
    this.sidenavClose.emit();
  }

}
