/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CallerComponent } from './features/caller/caller.component';
import { ReceiverComponent } from './features/receiver/receiver.component';
import { LoginscreenComponent } from './features/loginscreen/loginscreen.component';

import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthService], pathMatch: 'full' },
  { path: 'caller', component: CallerComponent, canActivate: [AuthService] },
  { path: 'receiver', component: ReceiverComponent, canActivate: [AuthService] },
  { path: 'auth', component: LoginscreenComponent },
  { path: '**', component: NotFound404Component }
];
