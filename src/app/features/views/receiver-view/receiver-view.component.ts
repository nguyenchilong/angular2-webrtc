import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { PeerconnectionService } from '../../../services/peerconnection.service';

import { WebrtcReceiver } from '../../components/webrtcreceiver/webrtcreceiver.component';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
    selector: 'receiver-view-component',
    templateUrl: './receiver.template.html'
})

export class ReceiverViewComponent implements OnDestroy, OnInit {

    @ViewChild('Receiver') receiver: WebrtcReceiver;
    @ViewChild('Chat') chat: ChatComponent;

    constructor(private peerconnectionservice: PeerconnectionService) {
        this.createConnection();
    }

    createConnection(): void {
        this.peerconnectionservice.createConnection();
        this.peerconnectionservice.pc.oniceconnectionstatechange = (e) => {
            console.log('iceConnectionState:');
            console.log(e);
            if (this.peerconnectionservice.pc.iceConnectionState === 'disconnected' ||
                this.peerconnectionservice.pc.iceConnectionState === 'closed') {
                this.closeConnection();
            }
        };
    }

    closeConnection(): void {
        this.peerconnectionservice.closeConnection();
        this.createConnection();
        this.receiver.configurateRTCPeerConnection();

    }

    ngOnInit() {
        this.receiver.configurateRTCPeerConnection();
    }


    ngOnDestroy() {
    }
}
