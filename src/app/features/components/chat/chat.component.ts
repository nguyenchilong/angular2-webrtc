import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { PeerconnectionService } from '../../../services/peerconnection.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MdInput } from '@angular/material'

@Component({
    selector: 'chat-component',
    templateUrl: './chat.template.html',
    styleUrls: ['./chat.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatComponent {

    @ViewChild('Input') input: MdInput;
    chat: Observable<any>;
    storecon: Observable<any>;
    showbutton: boolean = false;

    constructor(
        private peerconnectionservice: PeerconnectionService,
        private store: Store<any>) {
            this.chat = this.store.select(store => store.chat);
            this.storecon = this.store.select(store => store.peerconn);
            this.storecon.subscribe( (con) => {
            if (con.connectionexists === true && con.callactive === true) {
                this.showbutton = true;
            } else if (this.showbutton === true) {
                this.showbutton = false;
            }
        });
    }

    send(): void {
        this.store.dispatch({type: 'ADD_OWN_MESSAGE', payload: this.input.value});
        this.peerconnectionservice.dc.send(this.input.value);
    }
}
