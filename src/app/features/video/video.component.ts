import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'video-component',
    templateUrl: './video.template.html',
    styleUrls: ['./video.style.css']
})

export class VideoComponent {
    @ViewChild('myVideo') myVideo;
    @ViewChild('otherVideo') otherVideo;
}
