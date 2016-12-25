import { Injectable, Component } from '@angular/core';
import { WampService } from './wamp.service';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Injectable()

export class CallService {
    callsubscription: Subscription = new Subscription();
    usertocallid: number;

    constructor(
        private wampservice: WampService,
        public snackBar: MdSnackBar
    ) {
    };

    subscribeCall(): void {
        this.callsubscription = this.wampservice.callObservable.subscribe(call => {
            this.snackBar.open("asd", "ad");
        });
    }

    unsubscribeCall(): void {
        if (!this.callsubscription.closed) {
            this.callsubscription.unsubscribe();
        }
    }

}
