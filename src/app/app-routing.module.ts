import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoggedInGuard} from './loggedin.guard';
import {LoginComponent} from './login/login.component';
import {LoggedOutGuard} from './loggedout.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]},
  { path: 'signup', redirectTo: 'login'},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
