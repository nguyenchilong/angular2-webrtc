import { Component, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

import { WampService } from './services/wamp.service';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private wamp: WampService
  ) { }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }

  clickinside(): void {
    if (this.sidenav._isOpened) {
      this.sidenav.toggle();
    }
  }
}
