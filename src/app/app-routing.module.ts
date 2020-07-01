import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {
  AuthGuardService as AuthGuard
} from './service/auth-guard.service';
import { RootComponent } from './components/root/root.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {PeopleComponent} from './components/people/people.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component : LoginComponent},
  { path: 'home', component: RootComponent, canActivate : [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard] },
  { path: 'people', component: PeopleComponent, canActivate : [AuthGuard] },
  { path: 'things', component: RootComponent, canActivate : [AuthGuard] },
  { path: 'places', component: RootComponent, canActivate : [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
