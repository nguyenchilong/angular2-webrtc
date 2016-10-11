import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
    selector: 'webrtcvideo-component',
    styleUrls: ['./webrtcvideo.style.css'],
    templateUrl: './webrtcvideo.template.html'
})

export class WebrtcVideo implements OnInit, AfterViewInit, OnDestroy {

    constraints = { video: true, audio: false };
    stream: MediaStream;
    @ViewChild('myVideo') myVideo;

    constructor() { };

    stop(): void {
        this.myVideo.nativeElement.pause();
        this.stream.getVideoTracks().forEach((track) => track.stop());
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
        this.stop();

    }



}
