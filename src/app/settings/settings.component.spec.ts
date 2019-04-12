import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {
  MatCardModule,
  MatSlideToggleModule,
  MatSnackBarModule,
} from '@angular/material';
import {LayoutComponent} from '../layout/layout.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from '../login/login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {MockComponent} from 'ng-mocks';
import {AuthenticationService} from '../authentication.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let authService: AuthenticationService;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])
      ],
      declarations: [
        SettingsComponent,
        MockComponent(LayoutComponent),
        LoginComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [AngularFireAuth, AngularFirestore, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthenticationService);
    // spyOn(authService.router, 'navigate').and.returnValue(true);
    // authService.login('plougheed@wisc.edu', 'hello123');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(authService).toBeDefined();
  });

  it('should properly logout', async () => {
    spyOn(authService.router, 'navigate').and.returnValue(true);
    authService.login('plougheed@wisc.edu', 'hello123');
    component.doLogout();
    await wait();
    expect(authService.router.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.logoutMessage).toEqual('Log Out Successful');
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function wait() {
    await sleep(50);
  }

});
