import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
        selector: 'dashboard-component',
        templateUrl: './dashboard.html'
})

export class DashboardComponent {

        user: Observable<any>;
        @ViewChild('input') input;

        constructor(private store: Store<any>) {
                this.user = this.store.select(store => store.user);
        }

        loginUser(): void {
                this.store.dispatch({ type: 'LOGIN_USER' });
        }

        logoutUser(): void {
                this.store.dispatch({ type: 'LOGOUT_USER' });
        }

        setName(): void {
                this.store.dispatch({ type: 'SET_NAME', payload: this.input._value });
        }
}
