import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent {

    user: Observable<any>;
    @Output() toggleoutput = new EventEmitter();

    constructor(
        private store: Store<any>,
        private authservice: AuthService
        ) {
        this.user = this.store.select(store => store.user);
    }

    logoutUser(): void {
        this.authservice.signout();
    }

    // Emits Output if nav istoggled
    toggle(): void {
        this.toggleoutput.emit();
    }
}
