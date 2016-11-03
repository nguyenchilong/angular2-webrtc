import { Injectable } from '@angular/core';

@Injectable()

export class PeerconnectionService {

    cfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection;

    constructor() { };

    createConnection(): void {
        if (!this.pc || this.pc.signalingState === 'closed') {
            this.pc = new RTCPeerConnection(this.cfg);
            console.log('created PeerConnection');
        };
    }

    closeConnection(): void {
        if (this.pc.signalingState !== 'closed') {
            this.pc.close();
            console.log('closed PeerConnection');
        }
    }

}