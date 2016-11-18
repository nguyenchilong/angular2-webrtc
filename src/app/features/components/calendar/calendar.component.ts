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

    meetings: Observable<any>;
    dialogRef: MdDialogRef<CalendarDialog>;
    viewDate: Date = new Date();
    view: string = 'month';

    constructor(
        public dialog: MdDialog,
        public store: Store<any>,
        public restservice: RestService) {
        this.meetings = this.store.select(store => store.meetings);
    }

    ngOnInit() {
        let data = this.restservice.getMeetings();
        this.store.dispatch({ type: 'ADD_MEETINGS', payload: data });
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
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(CalendarDialog, config);

        // if single event from weekview
        if (e.event) {
            this.dialogRef.componentInstance.events = [e.event];
            this.dialogRef.componentInstance.none = false;
        } else {
            // if events is empty
            this.dialogRef.componentInstance.events = e.events;
            if (e.events.length !== 0) {
                this.dialogRef.componentInstance.none = false;
            }
        }
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef.componentInstance.none = true;
        });
    }

}

// Dialog Component
@Component({
    selector: 'calendar-dialog',
    templateUrl: './calendar.dialog.html'
})

export class CalendarDialog {
    events: any[];
    none: boolean = true;
    constructor(public dialogRef: MdDialogRef<CalendarDialog>) { }
}
