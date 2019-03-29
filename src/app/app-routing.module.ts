import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './loggedin.guard';
import { LoginComponent } from './login/login.component';
import { LoggedOutGuard } from './loggedout.guard';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  // TODO: change to profile/:id
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', redirectTo: 'login', canActivate: [LoggedOutGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
