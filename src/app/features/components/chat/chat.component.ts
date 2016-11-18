import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, OnInit }
    from '@angular/core';

import { PeerconnectionService } from '../../../services/peerconnection.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MdInput } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'chat-component',
    templateUrl: './chat.template.html',
    styleUrls: ['./chat.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})

export class ChatComponent implements OnInit {

    @ViewChild('Input') input: MdInput;
    @ViewChild('Messages') messages;
    chat: Observable<any>;
    storecon: Observable<any>;
    showbutton: boolean = false;
    chatform: FormGroup;

    constructor(
        private peerconnectionservice: PeerconnectionService,
        private store: Store<any>,
        private formBuilder: FormBuilder
    ) {
        this.chat = this.store.select(store => store.chat);
        this.storecon = this.store.select(store => store.peerconn);
        this.storecon.subscribe((con) => {
            if (con.connectionexists === true && con.callactive === true) {
                this.showbutton = true;
            } else if (this.showbutton === true) {
                this.showbutton = false;
            };
            this.chatform = this.formBuilder.group({
                message: ''
            });
        });
    }

    ngOnInit() {
        // scroll down when message is added
        this.chat.subscribe(chat => {
            this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
        });
    }

    send(): void {
        if (this.input.value !== '') {
            this.store.dispatch({ type: 'ADD_OWN_MESSAGE', payload: this.input.value });
            this.peerconnectionservice.dc.send(this.input.value);
            this.input.value = '';
        }
        this.input.focus();
    }
}
