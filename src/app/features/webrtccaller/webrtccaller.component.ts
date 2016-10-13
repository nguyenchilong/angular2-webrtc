import { Component } from '@angular/core';

@Component({
    selector: 'webrtccaller-component',
    templateUrl: './webrtccaller.template.html'
})

export class WebrtcCaller {

    constraints = { video: true, audio: true };
    stream: MediaStream = new MediaStream();
    pc: RTCPeerConnection = new RTCPeerConnection(null);

    startVideostream(): void {
        navigator.getUserMedia(
            this.constraints,
            (localMediaStream: MediaStream) => {
                // make stream global in component
                this.stream = localMediaStream;
            },
            (error) => { console.log('navigator.getUserMedia error: ', error); }
        );
    }

    call(): void {
        // add the stream to the rtcpeerconnection
        this.pc.addStream(this.stream);
        this.pc.createOffer(function (offer: RTCSessionDescriptionInit) {
            // Hier kommt der Fehler:
            this.pc.setLocalDescription(new RTCSessionDescription(offer), function () {
                console.log(offer);
                // send the offer to a server to be forwarded to the friend you're calling.
            }, this.closeconnection);
        }, this.closeconnection);
    }

    closeconnection(err): void {
        console.log('Loggin PeerConnection:');
        console.log(this.pc);
        console.log('Closed Connection');
        this.pc.close();
    }

    constructor() {

    }
}
