import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoggedInGuard } from "./loggedin.guard";
import { LoginComponent } from "./login/login.component";
import { LoggedOutGuard } from "./loggedout.guard";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { MessagingComponent } from "./messaging/messaging.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  // Put this back ^ canActivate: [LoggedInGuard]  jay
  // TODO: change to profile/:id
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "editprofile",
    component: EditprofileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: "login", component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: "signup", redirectTo: "login", canActivate: [LoggedOutGuard] },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [LoggedInGuard]
  },
  { path: "messaging", component: MessagingComponent },
  { path: "messaging/:id", component: MessagingComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
