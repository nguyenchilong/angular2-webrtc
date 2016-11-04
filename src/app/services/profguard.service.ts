import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()

export class ProfguardService implements CanActivate {

    role: string;
    user: Observable<any>;
    constructor(
        private store: Store<any>,
        private router: Router) {
        this.user =  this.store.select(store => store.user);
        this.user.subscribe((user) => {
            this.role = user.role;
        });
    }

    canActivate() {
        if (this.role === 'prof') {
            return true;
        } else {
            this.router.navigate(['']);
        };
    }
}
