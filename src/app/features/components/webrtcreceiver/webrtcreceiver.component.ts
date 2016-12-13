import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PeerconnectionService } from '../../../services/peerconnection.service';
import { WampService } from '../../../services/wamp.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

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
    offerStream: Subscription = new Subscription();
    icecandidateStream: Subscription = new Subscription();
    storeconStream: Subscription = new Subscription();

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
                                this.wamp.sendWithSocket(4, answer).subscribe(data => { });
                                console.log('subscribe icecandiatestream');
                                this.icecandidateStream = this.wamp.icecandidateObservable.subscribe(ice => {
                                    console.log('new icecandidate:');
                                    this.peerconnectionservice.pc.addIceCandidate(ice);
                                });
                                this.store.dispatch({ type: 'CALL_STARTED' });
                            },
                            () => {
                                this.stopCall();
                            }
                        );
                    },
                    () => {
                        this.stopCall();
                    }
                );
            },
            () => {
                this.stopCall();
            }
        );
    }

    configurateRTCPeerConnection(): void {
        console.log('subscribe offerstream');
        this.offerStream = this.wamp.offerObservable.subscribe(offer => {
            console.log('new offer:');
            this.handleOffer(offer);
        });
        // add remote stream to otherVideo
        this.peerconnectionservice.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        // push ice candidates from config to server
        this.peerconnectionservice.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.wamp.sendWithSocket(4, evt.candidate).subscribe(data => { });
            }
        };
    }


    ngOnInit() {
        this.startVideostream();
        this.storeconStream = this.storecon.subscribe((con) => {
            if (con.connectionexists === true && con.callactive === false) {
                this.configurateRTCPeerConnection();
                console.log('config receiver');
            }
        });
        this.peerconnectionservice.createConnection();
    }

    ngOnDestroy() {
        this.stopVideostream();
        this.storeconStream.unsubscribe();
        this.icecandidateStream.unsubscribe();
        this.offerStream.unsubscribe();
        this.peerconnectionservice.closeConnection();
    }

    stopCall(): void {
        this.storeconStream.unsubscribe();
        this.icecandidateStream.unsubscribe();
        this.offerStream.unsubscribe();
        this.peerconnectionservice.recreateConnection();
    }

}
