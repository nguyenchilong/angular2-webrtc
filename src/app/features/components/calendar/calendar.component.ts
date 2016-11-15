import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css'],
    encapsulation: ViewEncapsulation.None,
})

export class CalendarComponent {

    @Input() events;
    viewDate: Date = new Date();
    month: any = this.viewDate.getMonth();
    day: any = this.viewDate.getDay();
    view: string = 'month';

    switchToMonth(): void {
        this.view = 'month';
    }

    switchToWeek(): void {
        this.view = 'week';
    }

    switchToDay(): void {
        this.view = 'day';
    }

    dayClicked(e): void {
        alert(e.date);
        console.log(e);
    }

}
