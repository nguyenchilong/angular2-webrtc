import { NotFound404Component } from './not-found404.component';

import { VideoComponent } from './features/components/video/video.component';
import { WebrtcCaller } from './features/components/webrtccaller/webrtccaller.component';
import { WebrtcReceiver } from './features/components/webrtcreceiver/webrtcreceiver.component';
import { LoginComponent } from './features/components/login/login.component';
import { ChatComponent } from './features/components/chat/chat.component';
import { CalendarComponent } from './features/components/calendar/calendar.component';
import { MeetingsCompontent } from './features/components/meetings/meetings.component';
import { PasswordChangeComponent } from './features/components/passwordchange/passwordchange.component';

import { CallerViewComponent } from './features/views/caller-view/caller-view.component';
import { ReceiverViewComponent } from './features/views/receiver-view/receiver-view.component';
import { LoginViewComponent } from './features/views/login-view/login-view.component';
import { CalendarViewComponent } from './features/views/calendar-view/calendar-view.component';
import { ProfprofilViewComponent } from './features/views/profprofil-view/profprofil-view.component';
import { StudprofilViewComponent } from './features/views/studprofil-view/studprofil-view.component';

import { InfoDialog } from './features/dialogs/info-dialog/info-dialog.component';
import { MeetingsDialog } from './features/dialogs/meetings-dialog/meetings-dialog.component';
import { MeetingDialog } from './features/dialogs/meeting-dialog/meeting-dialog.component';
import { ForgotDialog } from './features/dialogs/forgot-dialog/forgot-dialog.component';
import { RegisterDialog } from './features/dialogs/register-dialog/register-dialog.component';
import { CreateMeetingComponent } from './features/dialogs/createMeeting-dialog/createMeeting-dialog.component';

import { NavComponent } from './features/components/nav/nav.component';

// Pipes
import { TransformDatePipe } from './app.pipes';

export const APP_DECLERATIONS = [

  // Not found
  NotFound404Component,

  // Components
  VideoComponent,
  WebrtcCaller,
  WebrtcReceiver,
  LoginComponent,
  ChatComponent,
  CalendarComponent,
  MeetingsCompontent,
  PasswordChangeComponent,

  // Views
  CallerViewComponent,
  ReceiverViewComponent,
  LoginViewComponent,
  CalendarViewComponent,
  ProfprofilViewComponent,
  StudprofilViewComponent,

  // dialogs
  InfoDialog,
  MeetingsDialog,
  MeetingDialog,
  ForgotDialog,
  RegisterDialog,
  CreateMeetingComponent,

  // Structure
  NavComponent,

  // Pipes
  TransformDatePipe
];
