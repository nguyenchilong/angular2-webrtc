import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';

@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css'],
    encapsulation: ViewEncapsulation.None,
})

export class CalendarComponent implements OnInit {

    events: any = [];
    meetings: Observable<any>;
    dialogRef: MdDialogRef<CalendarDialog>;
    viewDate: Date = new Date();
    view: string = 'month';

    constructor(
        public dialog: MdDialog,
        public store: Store<any>,
        public restservice: RestService) {
            this.meetings = this.store.select(store => store.meetings);
            this.meetings.subscribe(meetings => this.events = meetings);
         }

    ngOnInit() {
        let data = this.restservice.getMeetings();
        this.store.dispatch({type: 'ADD_MEETINGS', payload: data});
    }

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
        this.openDialog(e);
    }

    openDialog(e) {
        let config: MdDialogConfig = {disableClose: false};
        this.dialogRef = this.dialog.open(CalendarDialog, config);

        this.dialogRef.componentInstance.events = e.events;
        if (e.events.length !== 0) {
            this.dialogRef.componentInstance.none = false;
        }
        console.log(this.dialogRef.componentInstance.events.length);
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef.componentInstance.none = true;
        });
    }

}


@Component({
    selector: 'calendar-dialog',
    templateUrl: './calendar.dialog.html'
})
export class CalendarDialog {
    events: any[];
    none: boolean = true;
    constructor(public dialogRef: MdDialogRef<CalendarDialog>) { }
}
