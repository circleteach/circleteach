import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {
  MatButtonModule, MatButtonToggleModule, MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {
  AngularFirestoreModule
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { MycircleComponent } from './mycircle/mycircle.component';
import { SettingsComponent } from './settings/settings.component';
import {MessagingComponent} from './messaging/messaging.component';
import {TagsearchComponent} from './tagsearch/tagsearch.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatListModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        SidenavComponent,
        LayoutComponent,
        HomeComponent,
        LoginComponent,
        PostsComponent,
        UserSearchComponent,
        ProfileComponent,
        PersonalinfoComponent,
        ActivitylogComponent,
        MycircleComponent,
        SettingsComponent,
        MessagingComponent,
        TagsearchComponent,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'circleteach'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('circleteach');
  });

  /* An example test
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to circleteach!');
  });
  */
});
