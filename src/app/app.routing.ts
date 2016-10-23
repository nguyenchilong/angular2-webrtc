/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SnapshotComponent } from './features/snapshot/snapshot.component';
// import { RecorderComponent } from './features/recorder/recorder.component';
import { RtcpeerComponent } from './features/rtcpeer/rtcpeer.component';
import { CallerComponent } from './features/caller/caller.component';
import { ReceiverComponent } from './features/receiver/receiver.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'caller', component: CallerComponent },
  { path: 'receiver', component: ReceiverComponent },
  { path: '**', component: NotFound404Component }
];
