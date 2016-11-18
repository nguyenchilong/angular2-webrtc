import { Component, ChangeDetectionStrategy, ViewEncapsulation }
from '@angular/core';

@Component({
    selector: 'caller-view-component',
    templateUrl: './caller-view.template.html',
    styleUrls: ['./caller-view.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

    encapsulation: ViewEncapsulation.None,
})

export class CallerViewComponent {

    constructor() {  }
}
