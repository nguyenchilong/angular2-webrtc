import { NotFound404Component } from './not-found404.component';

import { WebrtcVideo } from './features/webrtcvideo';
import { WebrtcSnapshot } from './features/webrtcsnapshot';

import { VideoComponent } from './features/video/video.component';
import { SnapshotComponent } from './features/snapshot/snapshot.component';

export const APP_DECLERATIONS = [
  NotFound404Component,

  // Components with logic
  WebrtcVideo,
  WebrtcSnapshot,

  // Components to display
  VideoComponent,
  SnapshotComponent
];
