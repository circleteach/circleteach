import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {ActivitylogComponent} from '../activitylog/activitylog.component';
import {LayoutComponent} from '../layout/layout.component';
import {MycircleComponent} from '../mycircle/mycircle.component';
import {PostsComponent} from '../posts/posts.component';
import {MatCardModule, MatSlideToggleModule} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MockComponent} from 'ng-mocks';
import {BasicinfoComponent} from '../basicinfo/basicinfo.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../login/login.component";
import {AuthenticationService} from "../authentication.service";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatSlideToggleModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
      ],
      declarations: [
        ProfileComponent,
        LoginComponent,
        MockComponent(LayoutComponent),
        MockComponent(PostsComponent),
        MockComponent(BasicinfoComponent),
        MockComponent(MycircleComponent),
        MockComponent(ActivitylogComponent),
      ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthenticationService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.get(AngularFireAuth);
    TestBed.get(AngularFirestore);
    authService = TestBed.get(AuthenticationService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService.login('plougheed@wisc.edu', 'hello123').then(result => {
      fixture.detectChanges();
    }).catch(error => {
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
