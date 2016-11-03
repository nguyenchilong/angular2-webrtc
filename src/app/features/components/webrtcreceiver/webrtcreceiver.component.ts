import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../../services/constants';
import { PeerconnectionService } from '../../../services/peerconnection.service';

@Component({
    selector: 'webrtcreceiver-component',
    styleUrls: ['./webrtcreceiver.style.css'],
    templateUrl: './webrtcreceiver.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WebrtcReceiver implements OnInit, OnDestroy {

    constraints = {
        video: true,
        audio: true
    };
    stream: MediaStream;
    socket: SocketIOClient.Socket = io(SOCKET, { secure: true });
    @ViewChild('Video') video;

    constructor(private peerconnectionservice: PeerconnectionService) { }

    startVideostream(): void {
        navigator.getUserMedia(
            this.constraints,
            // success:
            (localMediaStream: MediaStream) => {
                this.stream = localMediaStream;
                this.video.myVideo.nativeElement.src = URL.createObjectURL(this.stream);
            },
            // error:
            (error) => { console.log('navigator.getUserMedia error: ', error); }
        );
    }

    stopVideostream(): void {
        if (this.stream.active) {
            this.stream.getAudioTracks().forEach((track) => track.stop());
            this.stream.getVideoTracks().forEach((track) => track.stop());
        }
    }

    onOffer(offer: RTCSessionDescriptionInit): void {
        // add stream to pc
        this.peerconnectionservice.pc.addStream(this.stream);
        // creating answer
        this.peerconnectionservice.pc.setRemoteDescription(
            new RTCSessionDescription(offer),
            // success:
            () => {
                this.peerconnectionservice.pc.createAnswer(
                    (answer: RTCSessionDescriptionInit) => {
                        this.peerconnectionservice.pc.setLocalDescription(
                            new RTCSessionDescription(answer),
                            () => {
                                // push answer to signalingchannel
                                this.socket.emit('push2', answer);
                            },
                            () => {
                                this.closeconnection();
                            }
                        );
                    },
                    () => {
                        this.closeconnection();
                    }
                );
            },
            () => {
                this.closeconnection();
            }
        );
    }

    closeconnection(): void {
        this.peerconnectionservice.closeConnection();
    }

    newconnection(): void {
        this.peerconnectionservice.createConnection();
        this.socket.on('getice1',
            (msg) => {
                console.log('new icecandidate');
                this.peerconnectionservice.pc.addIceCandidate(msg);
            }
        );
        // add remote stream to otherVideo
        this.peerconnectionservice.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        // push ice candidates from config to server
        this.peerconnectionservice.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.emit('pushice2', evt.candidate);
            }
        };
    }


    ngOnInit() {
        this.startVideostream();
        this.newconnection();
        // listening for offer from signalingchannel
        this.socket.on('get1',
            (msg) => {
                console.log('new offer');
                this.onOffer(msg);
            }
        );

    }

    ngOnDestroy() {
        this.closeconnection();
        this.stopVideostream();
    }

}
