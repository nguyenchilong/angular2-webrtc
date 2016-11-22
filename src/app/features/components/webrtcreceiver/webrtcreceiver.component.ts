import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../../services/constants';
import { PeerconnectionService } from '../../../services/peerconnection.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
    storecon: Observable<any>;

    constructor(
        private peerconnectionservice: PeerconnectionService,
        private store: Store<any>,
    ) {
        this.storecon = this.store.select(store => store.peerconn);
    }

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

    toggleAudio(): void {
        let audioTracks = this.stream.getAudioTracks();
        for (let i = 0, l = audioTracks.length; i < l; i++) {
            audioTracks[i].enabled = !audioTracks[i].enabled;
        }
    }

    toggleVideo(): void {
        let videoTracks = this.stream.getVideoTracks();
        for (let i = 0, l = videoTracks.length; i < l; i++) {
            videoTracks[i].enabled = !videoTracks[i].enabled;
        }
    }

    handleOffer(offer: RTCSessionDescriptionInit): void {
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
                                this.store.dispatch({ type: 'CALL_STARTED' });
                            },
                            () => {
                                this.peerconnectionservice.recreateConnection();
                            }
                        );
                    },
                    () => {
                        this.peerconnectionservice.recreateConnection();
                    }
                );
            },
            () => {
                this.peerconnectionservice.recreateConnection();
            }
        );
    }

    configurateRTCPeerConnection(): void {
        this.socket.on('get1',
            (msg) => {
                console.log('new offer');
                this.handleOffer(msg);
            }
        );
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
        this.storecon.subscribe((con) => {
            if (con.connectionexists === true && con.callactive === false) {
                this.socket.removeAllListeners();
                this.configurateRTCPeerConnection();
                console.log('config receiver');
            }
        });
        this.peerconnectionservice.createConnection();
    }

    ngOnDestroy() {
        this.stopVideostream();
        this.socket.removeAllListeners();
        this.peerconnectionservice.closeConnection();
    }

}
