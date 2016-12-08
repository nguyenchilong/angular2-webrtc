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
                this.wamp.signaling.subscribe(data => {
                        console.log('data from subscriber:');
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
        test(): void {
                console.log('starter request');
                this.wamp.sendOfferOrAnswer(2, 'testoffer').subscribe(data => {
                });
        }
}
