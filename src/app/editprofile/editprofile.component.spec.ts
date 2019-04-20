import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileComponent } from './editprofile.component';
import {MockComponent} from "ng-mocks";
import {LayoutComponent} from "../layout/layout.component";
import {UsersService} from "../users.service";
import {AuthenticationService} from "../authentication.service";
import {StorageService} from "../storage.service";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../login/login.component";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarModule} from "@angular/material";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from "../home/home.component";

describe('EditprofileComponent', () => {
  let component: EditprofileComponent;
  let fixture: ComponentFixture<EditprofileComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'home', component: HomeComponent}
        ])
      ],
      declarations: [
        EditprofileComponent,
        MockComponent(LayoutComponent),
        LoginComponent,
        HomeComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [AngularFireAuth, AngularFirestore, AngularFireStorage, AuthenticationService, UsersService, StorageService, MatSnackBar]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    try {
      TestBed.get(AngularFireAuth);
      authService = TestBed.get(AuthenticationService);
      fixture = TestBed.createComponent(EditprofileComponent);
      component = fixture.componentInstance;
      component.id = '8C4CDYnHEDYVe2aHemmf8iRvTgf1';
      authService.login('plougheed@wisc.edu', 'hello123').then(result => {
        fixture.detectChanges();
      }).catch(error => {
        console.log("Error while logging in for test");
      });
      fixture.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    if (authService !== undefined) {
      authService.logout();
    }
  });
});
