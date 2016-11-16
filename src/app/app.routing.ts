/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { DashboardViewComponent } from './features/views/dashboard-view/dashboard-view.component';
import { CallerViewComponent } from './features/views/caller-view/caller-view.component';
import { ReceiverViewComponent } from './features/views/receiver-view/receiver-view.component';
import { LoginViewComponent } from './features/views/login-view/login-view.component';
import { CalendarViewComponent } from './features/views/calendar-view/calendar-view.component';

import { AuthService } from './services/auth.service';
import { StudguardService } from './services/studguard.service';
import { ProfguardService } from './services/profguard.service';

export const routes: Routes = [
  { path: '', component: CalendarViewComponent, canActivate: [AuthService], pathMatch: 'full' },
  { path: 'caller', component: CallerViewComponent, canActivate: [AuthService, StudguardService] },
  { path: 'receiver', component: ReceiverViewComponent, canActivate: [AuthService, ProfguardService] },
  { path: 'auth', component: LoginViewComponent },
  { path: 'calendar', component: CalendarViewComponent },
  { path: 'dashboard', component: DashboardViewComponent},
  { path: '**', component: NotFound404Component }
];
