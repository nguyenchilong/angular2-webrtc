import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-store-devtools',
  templateUrl: './store-devtools.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  md-sidenav-layout {
    width: 100% !important;
  }
  `]
})

export class StoreDevToolsComponent {}
