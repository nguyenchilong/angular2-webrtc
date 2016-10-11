import { NotFound404Component } from './not-found404.component';

import { WebrtcVideo } from './features/webrtcvideo';
import { WebrtcSnapshot } from './features/webrtcsnapshot';
import { WebrtcRecord } from './features/webrtcrecord';

import { VideoComponent } from './features/video/video.component';
import { SnapshotComponent } from './features/snapshot/snapshot.component';
import { RecorderComponent } from './features/recorder/recorder.component';
export const APP_DECLERATIONS = [
  NotFound404Component,

  // Components with logic
  WebrtcVideo,
  WebrtcSnapshot,
  WebrtcRecord,

  // Components to display
  VideoComponent,
  SnapshotComponent,
  RecorderComponent
];
