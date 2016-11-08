import { Component, Input } from '@angular/core';

@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css']
})

export class CalendarComponent {

    @Input() events;
    viewDate: Date = new Date();
    month: any = this.viewDate.getMonth();
    day: any = this.viewDate.getDay();

}
