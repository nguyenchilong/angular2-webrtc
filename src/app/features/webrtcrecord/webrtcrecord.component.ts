import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
    selector: 'webrtcrecord-component',
    styleUrls: ['./webrtcrecord.style.css'],
    templateUrl: './webrtcrecord.template.html'
})

export class WebrtcRecord implements OnInit, AfterViewInit, OnDestroy {

    constraints = { video: true, audio: true };
    stream: MediaStream = new MediaStream();
    recorder = new MediaStreamRecorder(this.stream);
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

    startrecording(): void {
        this.recorder = new MediaStreamRecorder(this.stream);
        this.recorder.mimeType = 'video/webm';
        this.recorder.start(9999);
    }

    stoprecording(): void {
        // this.recorder.stop();
        this.recorder.save();
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
