import { Component, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'video-component',
    templateUrl: './video.template.html',
    styleUrls: ['./video.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent {

    @Output()
    toggleAudio =  new EventEmitter();
    @Output()
    toggleVideo = new EventEmitter();
    @ViewChild('myVideo')
    myVideo;
    @ViewChild('otherVideo')
    otherVideo;
    showmenu: boolean = false;
    videoactive: boolean = true;
    audioactive: boolean = true;

    enter(): void {
        this.showmenu = true;
    }
    leave(): void {
        this.showmenu = false;
    }

    audioClicked(): void {
        this.toggleAudio.emit();
        this.audioactive = !this.audioactive;
    }

    videoClicked(): void {
        this.toggleVideo.emit();
        this.videoactive = !this.videoactive;
    }

}
