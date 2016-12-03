import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';
import { MeetingsDialog } from '../../dialogs/meetings-dialog/meetings-dialog.component';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';


@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css'],
    encapsulation: ViewEncapsulation.None,
})

export class CalendarComponent implements OnInit {

    meetings: Observable<any>;
    dialogRef: MdDialogRef<MeetingsDialog>;
    dialogRef2: MdDialogRef<MeetingDialog>;
    viewDate: Date = new Date();
    view: string = 'month';

    constructor(
        public dialog: MdDialog,
        public store: Store<any>,
        public restservice: RestService) {
        this.meetings = this.store.select(store => store.meetings);
    }

    ngOnInit() {
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
        this.dialogRef = this.dialog.open(MeetingsDialog, config);

        // if single event from weekview
        if (e.event) {
            this.dialogRef.componentInstance.events = [e.event];
        } else {
            // if events is empty
            this.dialogRef.componentInstance.events = e.events;
            if (e.events.length !== 0) {
            } else {
                this.dialogRef.close();
                this.dialogRef2 = this.dialog.open(MeetingDialog, config);
                this.dialogRef2.afterClosed().subscribe(result => {
                });
            }
        }
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

}
