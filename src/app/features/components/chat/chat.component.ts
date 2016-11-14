import { Component, ViewChild } from '@angular/core';

import { PeerconnectionService } from '../../../services/peerconnection.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MdInput } from '@angular/material'

@Component({
    selector: 'chat-component',
    templateUrl: './chat.template.html',
    styleUrls: ['./chat.style.css']
})

export class ChatComponent {

    @ViewChild('Input') input: MdInput;
    chat: Observable<any>;

    constructor(
        private peerconnectionservice: PeerconnectionService,
        private store: Store<any>) {
            this.chat = this.store.select(store => store.chat);
    }

    send(): void {
        this.store.dispatch({type: 'ADD_OWN_MESSAGE', payload: this.input.value});
        this.peerconnectionservice.dc.send(this.input.value);
    }
}
