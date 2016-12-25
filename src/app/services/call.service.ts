import { Injectable } from '@angular/core';
import { WampService } from './wamp.service';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class CallService {
    callsubscription: Subscription = new Subscription();
    usertocallid: number;
    snackbarref: MdSnackBarRef<any>;

    constructor(
        private wampservice: WampService,
        private snackBar: MdSnackBar,
        private router: Router
    ) {
    };

    subscribeCall(): void {
        this.callsubscription = this.wampservice.callObservable.subscribe(call => {
            this.snackbarref = this.snackBar.open(call.title + ' ' + call.lastname + ' ' + 'is now available', 'Start');
            this.snackbarref.onAction().subscribe(() => {
                this.router.navigate(['caller']);
                //TODO: start calling prof
            });
            this.usertocallid = call.id;
        });
    }

    unsubscribeCall(): void {
        if (!this.callsubscription.closed) {
            this.callsubscription.unsubscribe();
        }
    }

}
