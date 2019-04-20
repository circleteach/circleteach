import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BasicinfoComponent } from "./basicinfo.component";
import {MatButtonModule, MatIconModule} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from '../authentication.service';
import {UsersService} from '../users.service';
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";

describe("BasicinfoComponent", () => {
  let component: BasicinfoComponent;
  let fixture: ComponentFixture<BasicinfoComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      declarations: [BasicinfoComponent],
      providers: [AngularFirestore, AngularFireAuth, AngularFireStorage, AuthenticationService, UsersService]
    }).compileComponents();
  }));

  beforeEach( async () => {
    TestBed.get(AngularFireAuth);
    authService = TestBed.get(AuthenticationService);
    fixture = TestBed.createComponent(BasicinfoComponent);
    component = fixture.componentInstance;
    component.id = '8C4CDYnHEDYVe2aHemmf8iRvTgf1';
    authService.login('plougheed@wisc.edu', 'hello123');
    fixture.detectChanges();
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
