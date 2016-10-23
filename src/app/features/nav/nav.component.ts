import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent {

    user: Observable<any>;
    @Output() toggleoutput = new EventEmitter();

    constructor(private store: Store<any>) {
        this.user = this.store.select(store => store.user);
    }

    loginUser(): void {
        this.store.dispatch({ type: 'LOGIN_USER' });
    }

    logoutUser(): void {
        this.store.dispatch({ type: 'LOGOUT_USER' });
    }

    // Emits Output if nav istoggled
    toggle(): void {
        this.toggleoutput.emit();
    }
}
