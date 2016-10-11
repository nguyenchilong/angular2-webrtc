/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { VideoComponent } from './features/video/video.component';
import { SnapshotComponent } from './features/snapshot/snapshot.component';
import { RecorderComponent } from './features/recorder/recorder.component';

export const routes: Routes = [
  { path: '', component: VideoComponent, pathMatch: 'full' },
  { path: 'snapshot', component: SnapshotComponent },
  { path: 'record', component: RecorderComponent },
  { path: '**', component: NotFound404Component }
];
