import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AuthenticationService} from '../authentication.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {LoginComponent} from '../login/login.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        MatListModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
      ],
      declarations: [ NavbarComponent, LoginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [AngularFireAuth, AngularFirestore, AngularFireStorage, AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.get(AngularFireAuth);
    TestBed.get(AngularFirestore);
    authService = TestBed.get(AuthenticationService);
    fixture = TestBed.createComponent(NavbarComponent);
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
