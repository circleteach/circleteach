import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {PersonalinfoComponent} from '../personalinfo/personalinfo.component';
import {ActivitylogComponent} from '../activitylog/activitylog.component';
import {LayoutComponent} from '../layout/layout.component';
import {MycircleComponent} from '../mycircle/mycircle.component';
import {PostsComponent} from '../posts/posts.component';
import {MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {SettingsComponent} from '../settings/settings.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserSearchComponent} from '../user-search/user-search.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppModule} from '../app.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule,
        AppModule,
      ],
      declarations: [
        /*
        ProfileComponent,
        PersonalinfoComponent,
        LayoutComponent,
        SidenavComponent,
        PostsComponent,
        MycircleComponent,
        NavbarComponent,
        UserSearchComponent,
        HomeComponent,
        SettingsComponent,
        ActivitylogComponent,
        LoginComponent,
        */
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
