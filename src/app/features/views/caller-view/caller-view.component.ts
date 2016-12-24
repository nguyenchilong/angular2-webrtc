import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { PeerconnectionService } from '../../../services/peerconnection.service';
import { WebrtcCaller } from '../../components/webrtccaller/webrtccaller.component';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
    selector: 'caller-view-component',
    templateUrl: './caller-view.template.html',
    styleUrls: ['./caller-view.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CallerViewComponent {

    @ViewChild('Caller')
    caller: WebrtcCaller;
    @ViewChild('Chat')
    chat: ChatComponent;

    constructor(private peerconnectionservice: PeerconnectionService) {
    }

}
