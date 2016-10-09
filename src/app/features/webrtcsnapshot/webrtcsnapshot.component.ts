import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
    selector: 'webrtcsnapshot-component',
    styleUrls: ['./webrtcsnapshot.style.css'],
    templateUrl: './webrtcsnapshot.template.html'
})

export class WebrtcSnapshot implements OnInit, AfterViewInit, OnDestroy {

    constraints: MediaStreamConstraints = {
        video: true,
        audio: false
    };
    stream: MediaStream;

    @ViewChild('myVideo') myVideo;
    @ViewChild('mySnapshot') mySnapshot;

    constructor() { };

    snapshot(): void {
        this.mySnapshot.nativeElement.getContext('2d')
        .drawImage(this.myVideo.nativeElement, 0, 0, 500, 375);
    }

    start(): void {
        navigator.getUserMedia(
            this.constraints,
            (localMediaStream: MediaStream) => {
                this.stream = localMediaStream;
                this.myVideo.nativeElement.src = URL.createObjectURL(this.stream);
                this.myVideo.nativeElement.play();
            },
            (error) => { console.log('navigator.getUserMedia error: ', error); }
        );
    }

    ngOnInit() {
        // Vll. für andere Browser:
        // navigator.getUserMedia = navigator.getUserMedia ||
        //     navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    }

    ngAfterViewInit() {
        this.start();

    }

    ngOnDestroy() {
        this.stream.getVideoTracks().forEach((track) => track.stop());

    }



}
