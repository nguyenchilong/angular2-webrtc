import { Component } from '@angular/core';

@Component({
    selector: 'calendar-view-component',
    templateUrl: './calendar-view.template.html',
    styleUrls: ['./calendar-view.style.css']
})

export class CalendarViewComponent {

    viewDate: Date = new Date();
    month: any = this.viewDate.getMonth();
    day: any = this.viewDate.getDay();

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

}
