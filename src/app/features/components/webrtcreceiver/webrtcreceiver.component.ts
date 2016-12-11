import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PeerconnectionService } from '../../../services/peerconnection.service';
import { WampService } from '../../../services/wamp.service';
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
    @ViewChild('Video') video;
    storecon: Observable<any>;

    constructor(
        private peerconnectionservice: PeerconnectionService,
        private store: Store<any>,
        private wamp: WampService
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
                                this.wamp.sendWithSocket(2, answer).subscribe(data => { });
                                this.wamp.icecandidate.subscribe(ice => {
                                    this.peerconnectionservice.pc.addIceCandidate(ice);
                                });
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
        this.wamp.offer.subscribe(offer => {
            this.handleOffer(offer);
        });
        // add remote stream to otherVideo
        this.peerconnectionservice.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        // push ice candidates from config to server
        this.peerconnectionservice.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.wamp.sendWithSocket(2, evt.candidate).subscribe(data => { });
            }
        };
    }


    ngOnInit() {
        this.startVideostream();
        this.storecon.subscribe((con) => {
            if (con.connectionexists === true && con.callactive === false) {
                this.configurateRTCPeerConnection();
                console.log('config receiver');
            }
        });
        this.peerconnectionservice.createConnection();
    }

    ngOnDestroy() {
        this.stopVideostream();
        this.peerconnectionservice.closeConnection();

    }

}
