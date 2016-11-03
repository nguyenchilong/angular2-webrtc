/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { DashboardViewComponent } from './features/views/dashboard-view/dashboard-view.component';
import { CallerViewComponent } from './features/views/caller-view/caller-view.component';
import { ReceiverViewComponent } from './features/views/receiver-view/receiver-view.component';
import { LoginViewComponent } from './features/views/login-view/login-view.component';

import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: '', component: DashboardViewComponent, canActivate: [AuthService], pathMatch: 'full' },
  { path: 'caller', component: CallerViewComponent, canActivate: [AuthService] },
  { path: 'receiver', component: ReceiverViewComponent, canActivate: [AuthService] },
  { path: 'auth', component: LoginViewComponent },
  { path: '**', component: NotFound404Component }
];
