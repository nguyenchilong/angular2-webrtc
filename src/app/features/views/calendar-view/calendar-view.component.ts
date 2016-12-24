import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'calendar-view-component',
    templateUrl: './calendar-view.template.html',
    styleUrls: ['./calendar-view.style.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent {

    events = [
        {
            title: 'Besprechung',
            start: new Date(),
            end: new Date(),
            color: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            },
            prof: 'Prof. Dr. Otto Offline',
            vorlesung: 'Mathe 1/2',
        }
    ];

    constructor() {
    }

}
