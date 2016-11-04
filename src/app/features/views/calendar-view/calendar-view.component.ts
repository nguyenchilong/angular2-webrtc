import { Component } from '@angular/core';

@Component({
    selector: 'calendar-view-component',
    templateUrl: './calendar-view.template.html',
    styleUrls: ['./calendar-view.style.css']
})

export class CalendarViewComponent {

        viewDate: Date = new Date();
        events = [];
        x = this.viewDate.getMonth();

}
