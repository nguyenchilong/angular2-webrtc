import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../../services/constants';
import { PeerconnectionService } from '../../../services/peerconnection.service';
import { WampService } from '../../../services/wamp.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'webrtccaller-component',
    styleUrls: ['./webrtccaller.style.css'],
    templateUrl: './webrtccaller.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WebrtcCaller implements OnInit, OnDestroy {

    constraints = {
        audio: true,
        video: true
    };
    stream: MediaStream;
    socket: SocketIOClient.Socket = io(SOCKET, { secure: true });
    storecon: Observable<any>;
    @ViewChild('Video') video;

    constructor(
        private peerconnectionservice: PeerconnectionService,
        private store: Store<any>,
        private wamp: WampService) {
        this.storecon = this.store.select(store => store.peerconn);
    }

    // this method starts the stream of the camera and pushes it to this.stream
    startVideostream(): void {
        navigator.getUserMedia(
            // constrains:
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

    startCall(): void {
        this.peerconnectionservice.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.emit('pushice1', evt.candidate);
            }
        };
        // add remote stream to otherVideo after stream from other peer arrives
        this.peerconnectionservice.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };

        // DAS MUSS NACH UNTEN
        this.socket.on('getice2',
            (msg) => {
                console.log('new icecandidate');
                this.peerconnectionservice.pc.addIceCandidate(msg);
            }
        );
        // add stream to pc
        this.peerconnectionservice.pc.addStream(this.stream);
        // create offer
        this.peerconnectionservice.pc.createOffer(
            (offer: RTCSessionDescriptionInit) => {
                this.peerconnectionservice.pc.setLocalDescription(
                    new RTCSessionDescription(offer),
                    () => {
                        // push offer to signalingchannel

                        // HIER KOMMT DER PUSHOFFERANSER HIN
                        this.socket.emit('push1', offer);
                        this.wamp.sendOfferOrAnswer(3, JSON.stringify(offer));
                        // start listening for an answer

                        // DAS MUSS PASSIEREN WENN VON CHANNEL EINE MSG KOMMT VOM TYP answer
                        // HIER KANN AUCH GLEICH DAS EMPFANGEN DES ICECANDIDATE KOMMEN
                        this.socket.on('get2', (msg) => {
                            console.log('new answer');
                            // adding the answer as remotedescription to this.pc
                            this.peerconnectionservice.pc.setRemoteDescription(
                                new RTCSessionDescription(msg),
                                () => {
                                    this.store.dispatch({ type: 'CALL_STARTED' });
                                },
                                () => {
                                    this.peerconnectionservice.recreateConnection();
                                }
                            );
                        });
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

    stopCall(): void {
        this.peerconnectionservice.recreateConnection();
        this.socket.removeAllListeners();
    }

    ngOnInit() {
        this.startVideostream();
        this.peerconnectionservice.createConnection();
    }

    ngOnDestroy() {
        this.stopVideostream();
        this.peerconnectionservice.closeConnection();
    }

}
