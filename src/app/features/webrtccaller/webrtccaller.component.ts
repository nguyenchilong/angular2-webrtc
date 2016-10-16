import { Component, ViewChild, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../services/constants';

@Component({
    selector: 'webrtccaller-component',
    styleUrls: ['./webrtccaller.style.css'],
    templateUrl: './webrtccaller.template.html'
})

export class WebrtcCaller implements OnInit {

    constraints = { video: true, audio: false };
    stream: MediaStream = new MediaStream();
    cfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection = new RTCPeerConnection(this.cfg);
    socket: SocketIOClient.Socket = io(SOCKET, { secure: true });
    @ViewChild('myVideo') myVideo;
    @ViewChild('otherVideo') otherVideo;


    // this method does start the stream of the camera and pushes it to this.stream
    startVideostream(): void {
        navigator.getUserMedia(
            // constrains:
            this.constraints,
            // success:
            (localMediaStream: MediaStream) => {
                // make stream global in component
                this.stream = localMediaStream;
                this.myVideo.nativeElement.src = URL.createObjectURL(this.stream);
            },
            // error:
            (error) => { console.log('navigator.getUserMedia error: ', error); }
        );
    }

    // this method does add this.stream to this.pc and 
    // emits an offer to the server and
    // start waiting for an anwer from the server
    call(): void {
        this.pc.addStream(this.stream);
        this.pc.createOffer((offer: RTCSessionDescriptionInit) => {
            this.pc.setLocalDescription(
                new RTCSessionDescription(offer),
                () => {
                    this.socket.emit('push1', offer);
                }, this.closeconnection);
            this.startlisteningforanswer();
        }, this.closeconnection);
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

    // helpfunction: listen for an answer from the server and
    // add answer to this.pc
    startlisteningforanswer(): void {
        console.log('listening for anwer');
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
        this.socket.on('getice2',
            (msg) => {
                console.log('caller');
                console.log(msg);
                this.pc.addIceCandidate(msg);
            }
        );
        // add remote stream to otherVideo
        this.pc.onaddstream = (mediastreamevent: RTCMediaStreamEvent) => {
            this.otherVideo.nativeElement.src = URL.createObjectURL(mediastreamevent.stream);
        };
        this.pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.emit('pushice1', evt.candidate);
            }
        };
    }

    constructor() {
    }
}
