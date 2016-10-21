import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../services/constants';

@Component({
    selector: 'webrtcreceiver-component',
    styleUrls: ['./webrtcreceiver.style.css'],
    templateUrl: './webrtcreceiver.template.html'
})

export class WebrtcReceiver implements OnInit, OnDestroy {

    constraints = {
        video: true,
        audio: true
    };
    stream: MediaStream = new MediaStream();
    cfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection = new RTCPeerConnection(this.cfg);
    socket: SocketIOClient.Socket = io(SOCKET, { secure: true });
    @ViewChild('myVideo') myVideo;
    @ViewChild('otherVideo') otherVideo;


    startVideostream(): void {
        navigator.getUserMedia(
            this.constraints,
            // success:
            (localMediaStream: MediaStream) => {
                this.stream = localMediaStream;
                this.myVideo.nativeElement.src = URL.createObjectURL(this.stream);
            },
            // error:
            (error) => { console.log('navigator.getUserMedia error: ', error); }
        );
    }


    onOffer(offer: RTCSessionDescriptionInit): void {
        // add stream to pc
        this.pc.addStream(this.stream);
        // creating answer
        this.pc.setRemoteDescription(
            new RTCSessionDescription(offer),
            // success:
            () => {
                this.pc.createAnswer(
                    (answer: RTCSessionDescriptionInit) => {
                        this.pc.setLocalDescription(
                            new RTCSessionDescription(answer),
                            // success:
                            () => {
                                // push answer to signalingchannel
                                this.socket.emit('push2', answer);
                            },
                            // error:
                            this.closeconnection
                        );
                    },
                    // error:
                    this.closeconnection);
            },
            // error:
            this.closeconnection);
    }

    // helpfunction for closing the connection and
    // stoping the stream
    closeconnection(err): void {
        if (this.pc.signalingState !== 'closed') {
            this.pc.close();
        }
        if (this.stream.active) {
            this.stream.stop();
        }
    }

    ngOnInit() {
        this.startVideostream();
        // listening for offer from signalingchannel
        this.socket.on('get1',
            (msg) => {
                this.onOffer(msg);
            }
        );
        this.socket.on('getice1',
            (msg) => {
                console.log('receiver');
                console.log(msg);
                this.pc.addIceCandidate(msg);
            }
        );
        // add remote stream to otherVideo
        this.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        // push ice candidates from config to server
        this.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.emit('pushice2', evt.candidate);
            }
        };
    }

    ngOnDestroy() {
        this.closeconnection(null);
    }

    constructor() { }
}
