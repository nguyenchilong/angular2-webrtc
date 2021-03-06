import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';

import { CalendarModule } from 'angular2-calendar';

export const APP_IMPORTS = [
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  RouterStoreModule.connectRouter(),
  StoreDevToolsModule,
  StoreModule.provideStore(rootReducer),
  CalendarModule.forRoot()
];
