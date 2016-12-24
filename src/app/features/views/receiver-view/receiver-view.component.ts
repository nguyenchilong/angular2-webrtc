import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'receiver-view-component',
    templateUrl: './receiver.template.html',
    styleUrls: ['./receiver.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ReceiverViewComponent {

    constructor() {
    };

}
