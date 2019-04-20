import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {UsersService} from "../users.service";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../login/login.component";
import {AngularFireModule, FirebaseAuth, FirebaseStorage} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])
      ],
      declarations: [ UserSearchComponent, LoginComponent ],
      providers: [AngularFireAuth, AngularFireStorage, UsersService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
