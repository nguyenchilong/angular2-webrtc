import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material/dialog';

@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css'],
    encapsulation: ViewEncapsulation.None,
})

export class CalendarComponent {

    @Input() events;
    dialogRef: MdDialogRef<CalendarDialog>;
    viewDate: Date = new Date();
    month: any = this.viewDate.getMonth();
    day: any = this.viewDate.getDay();
    view: string = 'month';

    constructor(public dialog: MdDialog) { }

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
        console.log(e.events);
        this.openDialog(e);
    }

    openDialog(e) {
        this.dialogRef = this.dialog.open(CalendarDialog, {
            disableClose: false
        });

        this.dialogRef.componentInstance.events = e.events;

        this.dialogRef.afterClosed().subscribe(result => {
            console.log('result: ' + result);
            this.dialogRef.componentInstance.events = true;
        });
    }

}


@Component({
    selector: 'calendar-dialog',
    templateUrl: './calendar.dialog.html'
})
export class CalendarDialog {
    events: any;
    constructor(public dialogRef: MdDialogRef<CalendarDialog>) { }
}
