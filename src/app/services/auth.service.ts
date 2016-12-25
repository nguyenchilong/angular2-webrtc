import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { RestService } from './rest.service';
import { WampService } from './wamp.service';
import { CallService } from './call.service';

@Injectable()
export class AuthService implements CanActivate {

    // JWT_KEY ist for getting the JWT from localStorage
    JWT_KEY: string = 'retain_token';
    JWT: string;

    constructor(
            private router: Router,
            private store: Store<any>,
            private restservice: RestService,
            private wampservice: WampService,
            private callservice: CallService) {
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

        if (this.isAuthorized()) {
            console.log('Started initial loading of data');
            this.restservice.readProfessors();
            this.restservice.readSlots();
            let userid = localStorage.getItem('user_id');
            if ( localStorage.getItem('user_role') === 'ROLE_STUDENT' ) {
                this.callservice.subscribeCall();
            }
            this.wampservice.initWamp(userid);
            this.store.dispatch({ type: 'SET_USER_LOGIN', payload: {
                username: localStorage.getItem('user_username'),
                role: localStorage.getItem('user_role'),
                firstname: localStorage.getItem('user_firstname'),
                lastname: localStorage.getItem('user_lastname')
            } });
        }
    }

    signout(): void {
        this.store.dispatch({ type: 'CLEAR' });
        this.wampservice.closeWamp();
        localStorage.removeItem(this.JWT_KEY);
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_username');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_firstname');
        localStorage.removeItem('user_lastname');
        this.JWT = '';
        this.store.dispatch({ type: 'LOGOUT_USER' });
        this.router.navigate(['auth']);
    }

}
