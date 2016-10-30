import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()

export class AuthService implements CanActivate {

    // JWT_KEY ist for getting the JWT from localStorage
    JWT_KEY: string = 'retain_token';
    JWT: string = '';

    constructor(
        private router: Router,
        private store: Store<any>
    ) {
        const token = window.localStorage.getItem(this.JWT_KEY);
        // check if token already exists in localStorage
        // and execute setJWT
        if (token) {
            this.setJWT(token);
        }
    };

    isAuthorized(): boolean {
        return Boolean(this.JWT);
    }

    // this method is executed by the router when some tries to 
    // enter a route, where canActive is set to this Service
    canActivate(): boolean {
        const canActivate = this.isAuthorized();
        this.onCanActivate(canActivate);
        return canActivate;
    }

    onCanActivate(canActivate: boolean) {
        if (!canActivate) {
            this.router.navigate(['', 'auth']);
        }
    }

    setJWT(jwt: string): void {
        if (!Boolean(window.localStorage.getItem(this.JWT_KEY))) {
            window.localStorage.setItem(this.JWT_KEY, jwt);
        }
        this.JWT = jwt;
        this.store.dispatch({ type: 'LOGIN_USER' });
    }

    // here we do a http post request for getting
    // the jwt, set it to local storage and push in into the
    // user object in the store
    authenticate(path: string, credentials: any): Observable<any> {
        /*
        return this.http....do(setJWT(jwt)).....
        */
        return;
    }

    signout(): void {
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.dispatch({ type: 'LOGOUT_USER' });
        this.router.navigate(['auth']);
    }
}
