import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from "@angular/material/chips";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import {
  AngularFirestore,
  AngularFirestoreModule
} from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoginComponent } from "./login/login.component";
import { PostsComponent } from "./posts/posts.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserSearchComponent } from "./user-search/user-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BasicinfoComponent } from "./basicinfo/basicinfo.component";
import { ActivitylogComponent } from "./activitylog/activitylog.component";
import { MycircleComponent } from "./mycircle/mycircle.component";
import { SettingsComponent } from "./settings/settings.component";
import { MessagingComponent } from "./messaging/messaging.component";
import { TagsearchComponent } from "./tagsearch/tagsearch.component";
import {OnCreate} from './customDirectives/onCreate';

@NgModule({
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
    BasicinfoComponent,
    ActivitylogComponent,
    MycircleComponent,
    SettingsComponent,
    MessagingComponent,
    TagsearchComponent,
    OnCreate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  exports: [AppRoutingModule],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
