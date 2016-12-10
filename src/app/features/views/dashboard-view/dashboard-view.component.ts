import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';
import { Observable } from 'rxjs';
import { WampService } from '../../../services/wamp.service';

@Component({
        selector: 'dashboard-view-component',
        templateUrl: './dashboard-view.html',
        changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardViewComponent {

        user: Observable<any>;
        switch: boolean = true;

        constructor(
                private store: Store<any>,
                private restservice: RestService,
                private wamp: WampService
        ) {
                this.user = this.store.select(store => store.user);
                this.wamp.offer.subscribe(data => {
                        console.log('OFFER:');
                        console.log(data);
                });
                this.wamp.icecandidate.subscribe(data => {
                        console.log('ICE:');
                        console.log(data);
                });
        }

        toProf(): void {
                this.store.dispatch({ type: 'SET_ROLE', payload: 'prof' });
                this.switch = !this.switch;
        }

        toStud(): void {
                this.store.dispatch({ type: 'SET_ROLE', payload: 'stud' });
                this.switch = !this.switch;
        }
}
