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
            let userid = localStorage.getItem('user_id');
            console.log('Started initial loading of data');
            // LOAD DATA FOR STUDENT
            if (localStorage.getItem('user_role') === 'ROLE_STUDENT') {
                this.restservice.readProfessors();
                this.restservice.readSlots();
            }
            // LOAD DATA FOR PROF
            if (localStorage.getItem('user_role') === 'ROLE_PROF') {
                
            }
            // LOAD DATA FOR STUDENT AND PROF
            this.restservice.readMeetings(parseInt(userid));
            // SUBSCRIBE TO CALL (PROF IS READY FOR SLOT)
            if ( localStorage.getItem('user_role') === 'ROLE_STUDENT' ) {
                this.callservice.subscribeCall();
            }
            // CONNECT TO WEBSOCKET
            this.wampservice.initWamp(userid);
            // PUSH USER TO STORE
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
        localStorage.removeItem('user_title');
        this.JWT = '';
        this.store.dispatch({ type: 'LOGOUT_USER' });
        this.callservice.unsubscribeCall();
        this.router.navigate(['auth']);
    }

}
