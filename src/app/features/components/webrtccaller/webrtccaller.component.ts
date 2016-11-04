import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../../services/constants';
import { PeerconnectionService } from '../../../services/peerconnection.service';


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
    status: boolean = false;
    @ViewChild('Video') video;

    constructor(private peerconnectionservice: PeerconnectionService) {
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

    startCall(): void {
        this.status = !this.status;
        this.peerconnectionservice.createConnection();
        this.peerconnectionservice.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.emit('pushice1', evt.candidate);
            }
        };
        // add remote stream to otherVideo after stream from other peer arrives
        this.peerconnectionservice.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
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
                        this.socket.emit('push1', offer);
                        // start listening for an answer
                        this.startlisteningforanswer();
                    },
                    this.closeconnection);
            },
            this.closeconnection);
    }

    stopCall(): void {
        this.status = !this.status;
        this.closeconnection();
        this.socket.removeAllListeners();
    }

    closeconnection(): void {
        this.peerconnectionservice.closeConnection();
    }

    // helpfunction: listen for an answer from the server and
    // add answer to this.pc
    startlisteningforanswer(): void {
        this.socket.on('get2', (msg) => {
            console.log('new answer');
            // adding the answer as remotedescription to this.pc
            this.peerconnectionservice.pc.setRemoteDescription(
                new RTCSessionDescription(msg),
                () => { },
                () => { }
            );
        });
    }

    ngOnInit() {
        this.peerconnectionservice.createConnection();
        this.startVideostream();
    }

    ngOnDestroy() {
        this.closeconnection();
        this.stopVideostream();
    }

}
