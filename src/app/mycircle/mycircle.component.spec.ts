import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatButtonModule, MatIconModule } from "@angular/material";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import {
  AngularFirestore,
  AngularFirestoreModule
} from "@angular/fire/firestore";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";
import { MycircleComponent } from "./mycircle.component";
import { LoginComponent } from "../login/login.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireStorageModule
} from "@angular/fire/storage";
import { StorageService } from "../storage.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("MycircleComponent", () => {
  let component: MycircleComponent;
  let fixture: ComponentFixture<MycircleComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        NoopAnimationsModule,
        AngularFireStorageModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: "login", component: LoginComponent }
        ])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [MycircleComponent, LoginComponent],
      providers: [
        AngularFirestore,
        AngularFireAuth,
        AngularFireStorage,
        StorageService,
        AuthenticationService,
        UsersService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.get(AngularFireAuth);
    authService = TestBed.get(AuthenticationService);
    fixture = TestBed.createComponent(MycircleComponent);
    component = fixture.componentInstance;
    component.id = "8C4CDYnHEDYVe2aHemmf8iRvTgf1";
    authService
      .login("plougheed@wisc.edu", "hello123")
      .then(result => {
        fixture.detectChanges();
      })
      .catch(error => {});
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
