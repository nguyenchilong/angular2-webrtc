import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../services/constants';

@Component({
    selector: 'webrtccaller-component',
    styleUrls: ['./webrtccaller.style.css'],
    templateUrl: './webrtccaller.template.html'
})

export class WebrtcCaller implements OnInit, OnDestroy {

    constraints = {
        audio: true,
        video: true
    };
    stream: MediaStream = new MediaStream();
    cfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection = new RTCPeerConnection(this.cfg);
    socket: SocketIOClient.Socket = io(SOCKET, { secure: true });
    @ViewChild('Video') video;


    // this method does start the stream of the camera and pushes it to this.stream
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

    call(): void {
        // add stream to pc
        this.pc.addStream(this.stream);
        // create offer
        this.pc.createOffer(
            (offer: RTCSessionDescriptionInit) => {
                this.pc.setLocalDescription(
                    new RTCSessionDescription(offer),
                    () => {
                        // push offer to signalingchannel
                        this.socket.emit('push1', offer);
                        // start listening for an answer
                        this.startlisteningforanswer();
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
            this.stream.getAudioTracks().forEach((track) => track.stop());
            this.stream.getVideoTracks().forEach((track) => track.stop());
        }
    }

    // helpfunction: listen for an answer from the server and
    // add answer to this.pc
    startlisteningforanswer(): void {
        this.socket.on('get2', (msg) => {
            // adding the answer as remotedescription to this.pc
            this.pc.setRemoteDescription(
                new RTCSessionDescription(msg),
                () => { },
                () => { }
            );
        });
    }

    ngOnInit() {
        this.startVideostream();
        // start listening for icecandidates from signalingchannel
        this.socket.on('getice2',
            (msg) => {
                console.log('caller');
                console.log(msg);
                this.pc.addIceCandidate(msg);
            }
        );
        // add remote stream to otherVideo after stream from other peer arrives
        this.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.video.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        this.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.emit('pushice1', evt.candidate);
            }
        };
    }

    ngOnDestroy() {
        this.closeconnection(null);
    }

    constructor() {  }

}
