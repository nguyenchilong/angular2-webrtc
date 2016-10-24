import { NotFound404Component } from './not-found404.component';

import { VideoComponent } from './features/video/video.component';
import { WebrtcCaller } from './features/webrtccaller';
import { WebrtcReceiver } from './features/webrtcreceiver';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CallerComponent } from './features/caller/caller.component';
import { ReceiverComponent } from './features/receiver/receiver.component';

import { NavComponent } from './features/nav/nav.component';


export const APP_DECLERATIONS = [

  // Not found
  NotFound404Component,

  // Components
  VideoComponent,
  WebrtcCaller,
  WebrtcReceiver,

  // Pages
  DashboardComponent,
  CallerComponent,
  ReceiverComponent,

  // Structure
  NavComponent
];
