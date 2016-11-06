import { Component, OnDestroy, ViewChild } from '@angular/core';

import { PeerconnectionService } from '../../../services/peerconnection.service';
import { WebrtcCaller } from '../../components/webrtccaller/webrtccaller.component';
import { ChatComponent } from '../../components/chat/chat.component';


@Component({
    selector: 'caller-view-component',
    templateUrl: './caller-view.template.html',
    styleUrls: ['./caller-view.style.css']
})

export class CallerViewComponent implements OnDestroy {

    @ViewChild('Caller') caller: WebrtcCaller;
    @ViewChild('Chat') chat: ChatComponent;

    constructor(private peerconnectionservice: PeerconnectionService) {
        this.createConnection();
    }

    createConnection(): void {
        this.peerconnectionservice.createConnection();
        this.peerconnectionservice.pc.oniceconnectionstatechange = () => {
            if (this.peerconnectionservice.pc.iceConnectionState === 'disconnected' ||
            this.peerconnectionservice.pc.iceConnectionState === 'closed') {
                this.closeConnection();
            }
        };
    }

    closeConnection(): void {
        this.peerconnectionservice.closeConnection();
        this.createConnection();
    }

    ngOnDestroy() {
        this.peerconnectionservice.closeConnection();
    }
}
