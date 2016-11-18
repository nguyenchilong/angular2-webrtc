import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'video-component',
    templateUrl: './video.template.html',
    styleUrls: ['./video.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class VideoComponent { }
