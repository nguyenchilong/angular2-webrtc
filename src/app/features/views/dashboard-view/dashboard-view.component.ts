import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
        selector: 'dashboard-view-component',
        templateUrl: './dashboard-view.html',
        changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardViewComponent {

        user: Observable<any>;
        @ViewChild('input') input;

        constructor(private store: Store<any>) {
                this.user = this.store.select(store => store.user);
        }

        setName(): void {
                this.store.dispatch({ type: 'SET_NAME', payload: this.input._value });
        }
}
