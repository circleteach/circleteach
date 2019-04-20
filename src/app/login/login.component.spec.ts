import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import {MatButtonModule, MatIconModule} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from '../authentication.service';
import {UsersService} from '../users.service';
import {LoginComponent} from "./login.component";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {HomeComponent} from "../home/home.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'home', component: HomeComponent}
        ])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [LoginComponent, HomeComponent],
      providers: [AngularFirestore, AngularFireAuth, AuthenticationService, UsersService]
    }).compileComponents();
  }));

  beforeEach( () => {
    TestBed.get(AngularFireAuth);
    authService = TestBed.get(AuthenticationService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService.login('plougheed@wisc.edu', 'hello123').then(result => {
      fixture.detectChanges();
    }).catch(error => {
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function wait() {
    await sleep(50);
  }
});
