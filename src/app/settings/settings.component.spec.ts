import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import {LayoutComponent} from '../layout/layout.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserSearchComponent} from '../user-search/user-search.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import {ProfileComponent} from '../profile/profile.component';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../app.component';
import {AppModule} from '../app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

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
        AngularFirestoreModule,
        RouterTestingModule,
        AppModule, // TODO Fix proper component embedding to solely test this component and fix declarations
      ],
      declarations: [
        /*
        SettingsComponent,
        LayoutComponent,
        SidenavComponent,
        NavbarComponent,
        UserSearchComponent,
        HomeComponent,
        LoginComponent,
        ProfileComponent,*/
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [AngularFireAuth, AngularFirestore]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
