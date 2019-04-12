import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SidenavComponent} from './sidenav.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AuthenticationService} from '../authentication.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {LoginComponent} from '../login/login.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        MatListModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
      ],
      declarations: [ SidenavComponent, LoginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [AngularFireAuth, AngularFirestore, AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
