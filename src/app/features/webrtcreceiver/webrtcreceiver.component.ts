import { Component, ViewChild, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SOCKET } from '../../services/constants';

@Component({
    selector: 'webrtcreceiver-component',
    styleUrls: ['./webrtcreceiver.style.css'],
    templateUrl: './webrtcreceiver.template.html'
})

export class WebrtcReceiver implements OnInit {

    constraints = {
        video: true,
        audio: true
    };
    stream: MediaStream = new MediaStream();
    cfg = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };
    pc: RTCPeerConnection = new RTCPeerConnection(this.cfg);
    socket: SocketIOClient.Socket = io(SOCKET, { secure: true });
    offer: RTCSessionDescriptionInit;
    @ViewChild('myVideo') myVideo;
    @ViewChild('otherVideo') otherVideo;


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


    receive(): void {
        this.pc.addStream(this.stream);
        this.pc.setRemoteDescription(new RTCSessionDescription(this.offer), () => {
            this.pc.createAnswer((answer: RTCSessionDescriptionInit) => {
                this.pc.setLocalDescription(
                    new RTCSessionDescription(answer),
                    () => {
                        this.socket.emit('push2', answer);
                    }, this.closeconnection
                );
            }, this.closeconnection);
        }, this.closeconnection);
    }

    closeconnection(err): void {
        this.pc.close();
        console.log('closed connection');
    }

    ngOnInit() {
        this.startVideostream();
        this.socket.on('get1',
            (msg) => {
                this.offer = msg;
                this.receive();
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

    constructor() { }
}
