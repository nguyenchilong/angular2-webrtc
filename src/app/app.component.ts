import { Component, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { STUDVIEWS, PROFVIEWS } from './app-nav-views';
import { MOBILE } from './services/constants';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  views;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  user: Observable<any>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private store: Store<any>
  ) {
    this.user = this.store.select(store => store.user);
    this.user.subscribe((user) => {
      console.log(user);
      if (user.role === 'stud') {
        this.views = STUDVIEWS;
      } else if (user.role === 'prof') {
        this.views = PROFVIEWS;
      }
     });
  }

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
