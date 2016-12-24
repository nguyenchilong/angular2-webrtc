import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class PeerconnectionService {

    pccfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection;
    dc: RTCDataChannel;
    peerchannel: RTCDataChannel;
    storecon: Observable<any>;

    constructor(private store: Store<any>) {
        this.storecon = this.store.select(store => store.peerconn);
        this.storecon.subscribe((con) => console.log(con));
    };

    createConnection(): void {
        this.store.dispatch({type: 'DELETE_MESSAGES'});
        // create new pc and add listener
        this.pc = new RTCPeerConnection(this.pccfg);
        // listener for incomming datachannel
        this.pc.ondatachannel = (e) => {
            // set peerchannel
            this.peerchannel = e.channel;
            this.peerchannel.onmessage = (msg) => {
                this.store.dispatch({type: 'ADD_PEER_MESSAGE', payload: { text: msg.data, source: 'peer' }});
            };
        };
        // listener for closed connection by peer
        this.pc.oniceconnectionstatechange = (e) => {
            if (this.pc.iceConnectionState === 'disconnected' ||
                this.pc.iceConnectionState === 'closed') {
                this.recreateConnection();
                console.log(e);
            }
        };
        // set localchannel
        this.dc = this.pc.createDataChannel('DataChannel');
        this.store.dispatch({ type: 'CONNECTION_CREATED' });
    }

    closeConnection(): void {
        this.pc.oniceconnectionstatechange = () => {};
        // close dc if it is not already closed
        if (this.pc && (this.pc.signalingState !== 'closed')) {
            this.pc.close();
            this.store.dispatch({ type: 'CONNECTION_CLOSED' });
            this.store.dispatch({ type: 'CALL_ENDED' });
        }
    }

    recreateConnection(): void {
        this.closeConnection();
        this.createConnection();
    }

}
