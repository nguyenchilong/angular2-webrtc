/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import { VideoComponent } from './features/video/video.component';

export const routes: Routes = [
  { path: '', component: VideoComponent, pathMatch: 'full' },
  { path: '**', component: NotFound404Component }
];
