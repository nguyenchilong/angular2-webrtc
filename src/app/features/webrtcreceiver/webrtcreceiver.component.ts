import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
    selector: 'webrtcreceiver-component',
    templateUrl: './webrtcreceiver.template.html'
})

export class WebrtcReceiver {

    constraints = { video: true, audio: true };
    stream: MediaStream = new MediaStream();
    pc: RTCPeerConnection = new RTCPeerConnection(null);
    socket: SocketIOClient.Socket;
    offer: any;

    startVideostream(): void {
        navigator.getUserMedia(
            this.constraints,
            (localMediaStream: MediaStream) => {
                // make stream global in component
                this.stream = localMediaStream;
                console.log('got stream');
            },
            (error) => { console.log('navigator.getUserMedia error: ', error); }
        );
    }

    getoffer(): void {
        // add the stream to the rtcpeerconnection
        this.pc.addStream(this.stream);
        // hole offer
        this.socket.emit('get');
    }
    receive(): void {
        this.pc.setRemoteDescription(new RTCSessionDescription(this.offer), () => {
            this.pc.createAnswer((answer: RTCSessionDescriptionInit) => {
                this.pc.setLocalDescription(
                    new RTCSessionDescription(answer),
                    () => { this.socket.emit('push2', answer); },
                    this.closeconnection
                );
            }, this.closeconnection);
        }, this.closeconnection);
    }

    closeconnection(err): void {
        this.pc.close();
        console.log('closed connection');
    }

    constructor() {
        this.socket = io('192.168.2.47:3000');
        this.socket.on('get',
            (msg) => {
                this.offer = msg;
                console.log(msg);
            }
        );
    }
}
