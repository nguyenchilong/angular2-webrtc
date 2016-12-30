import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PeerconnectionService } from '../../../services/peerconnection.service';
import { WampService } from '../../../services/wamp.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

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
    storecon: Observable<any>;
    @ViewChild('Video')
    video;
    answerStream: Subscription = new Subscription();
    icecandidateStream: Subscription = new Subscription();
    peerid: number = 104;

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
        if (this.stream && this.stream.active) {
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
        console.log('subscribe icecandidateStream');
        this.icecandidateStream = this.wamp.icecandidateObservable.subscribe(data => {
            console.log('new icecandidate:');
            this.peerconnectionservice.pc.addIceCandidate(data);
        });
        this.peerconnectionservice.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.wamp.sendWithSocket(this.peerid, evt.candidate).subscribe(data => { });
            }
        };
        // add remote stream to otherVideo after stream from other peer arrives
        this.peerconnectionservice.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        // add stream to pc
        this.peerconnectionservice.pc.addStream(this.stream);
        // create offer
        this.peerconnectionservice.pc.createOffer(
            (offer: RTCSessionDescriptionInit) => {
                this.peerconnectionservice.pc.setLocalDescription(
                    new RTCSessionDescription(offer),
                    () => {
                        // push offer to signalingchannel
                        this.wamp.sendWithSocket(this.peerid, offer).subscribe(data => { });
                        console.log('subscribe answerStream');
                        this.answerStream = this.wamp.answerObservable.subscribe(data => {
                            console.log('new answer');
                            // adding the answer as remotedescription to this.pc
                            this.peerconnectionservice.pc.setRemoteDescription(
                                new RTCSessionDescription(data),
                                () => {
                                    this.store.dispatch({ type: 'CALL_STARTED' });
                                },
                                () => {
                                    this.stopCall();
                                }
                            );
                        });
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

    stopCall(): void {
        this.answerStream.unsubscribe();
        this.icecandidateStream.unsubscribe();
        this.peerconnectionservice.recreateConnection();
    }

    ngOnInit() {
        this.startVideostream();
        this.peerconnectionservice.createConnection();
    }

    ngOnDestroy() {
        this.stopVideostream();
        this.answerStream.unsubscribe();
        this.icecandidateStream.unsubscribe();
        this.peerconnectionservice.closeConnection();
    }

}
