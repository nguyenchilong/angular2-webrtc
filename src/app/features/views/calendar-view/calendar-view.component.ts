import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
    selector: 'calendar-view-component',
    templateUrl: './calendar-view.template.html',
    styleUrls: ['./calendar-view.style.css']
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
        this.calendar.events = this.events;
    }


}
