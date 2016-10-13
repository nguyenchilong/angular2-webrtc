import { NotFound404Component } from './not-found404.component';

import { WebrtcVideo } from './features/webrtcvideo';
import { WebrtcSnapshot } from './features/webrtcsnapshot';
import { WebrtcRecord } from './features/webrtcrecord';
import { WebrtcCaller } from './features/webrtccaller';

import { VideoComponent } from './features/video/video.component';
import { SnapshotComponent } from './features/snapshot/snapshot.component';
import { RecorderComponent } from './features/recorder/recorder.component';
import { RtcpeerComponent } from './features/rtcpeer/rtcpeer.component';

export const APP_DECLERATIONS = [
  NotFound404Component,

  // Components with logic
  WebrtcVideo,
  WebrtcSnapshot,
  WebrtcRecord,
  WebrtcCaller,

  // Components to display
  VideoComponent,
  SnapshotComponent,
  RecorderComponent,
  RtcpeerComponent
];
