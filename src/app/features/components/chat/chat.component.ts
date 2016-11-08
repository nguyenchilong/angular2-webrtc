import { Component } from '@angular/core';

import { PeerconnectionService } from '../../../services/peerconnection.service';

@Component({
    selector: 'chat-component',
    templateUrl: './chat.template.html',
    styleUrls: ['./chat.style.css']
})

export class ChatComponent {

    constructor(private peerconnectionservice: PeerconnectionService) {

    }

    send(): void {
        this.peerconnectionservice.dc.send('Hello!');
    }

    configureDataChannel(): void {

    }
}
