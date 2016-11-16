import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { PeerconnectionService } from '../../../services/peerconnection.service';

import { WebrtcReceiver } from '../../components/webrtcreceiver/webrtcreceiver.component';
import { ChatComponent } from '../../components/chat/chat.component';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'receiver-view-component',
    templateUrl: './receiver.template.html',
    styleUrls: ['./receiver.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})

export class ReceiverViewComponent {

    @ViewChild('Receiver') receiver: WebrtcReceiver;
    storecon: Observable<any>;

    constructor(
        private store: Store<any>,
        private peerconnectionservice: PeerconnectionService
    ) {
    };
}
