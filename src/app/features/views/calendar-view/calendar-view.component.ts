import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
    selector: 'calendar-view-component',
    templateUrl: './calendar-view.template.html',
    styleUrls: ['./calendar-view.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarViewComponent implements OnInit {

    @ViewChild('Calendar') calendar: CalendarComponent;

    events = [
        {
            title: 'Besprechung',
            start: new Date(),
            end: new Date(),
            color: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            },
        }
    ];

    ngOnInit() {
    }


}
