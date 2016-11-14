import { Component, ViewChild } from '@angular/core';
import { PeerconnectionService } from '../../../services/peerconnection.service';

import { WebrtcReceiver } from '../../components/webrtcreceiver/webrtcreceiver.component';
import { ChatComponent } from '../../components/chat/chat.component';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'receiver-view-component',
    templateUrl: './receiver.template.html'
})

export class ReceiverViewComponent {

    @ViewChild('Receiver') receiver: WebrtcReceiver;
    @ViewChild('Chat') chat: ChatComponent;
    storecon: Observable<any>;

    constructor(
        private store: Store<any>,
        private peerconnectionservice: PeerconnectionService
    ) {
    };
}
