import { Injectable } from '@angular/core';

@Injectable()

export class PeerconnectionService {

    pccfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection;
    dc: RTCDataChannel;

    constructor() { };

    createConnection(): void {
        if (!this.pc || this.pc.signalingState === 'closed') {
            this.pc = new RTCPeerConnection(this.pccfg);
            console.log('created new PeerConnection');
            this.pc.ondatachannel = (e) => {
                let peerchannel = e.channel;
                peerchannel.onmessage = (msg) => {
                    console.log(msg.data);
                };
            };
            this.dc = this.pc.createDataChannel('DataChannel');
        };
    }

    closeConnection(): void {
        if (this.pc.signalingState !== 'closed') {
            this.pc.close();
            console.log('closed PeerConnection');
        }
    }

}
