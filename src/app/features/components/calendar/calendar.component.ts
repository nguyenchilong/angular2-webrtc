import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MeetingsDialog } from '../../dialogs/meetings-dialog/meetings-dialog.component';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { RestService } from '../../../services/rest.service';
import { Slot } from '../../../model/slot';
import { UserLogin } from '../../../model/user-login';


@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css'],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

    meetings: Observable<Array<Slot>>;
    dialogRef: MdDialogRef<MeetingsDialog>;
    dialogRef2: MdDialogRef<MeetingDialog>;
    viewDate: Date = new Date();
    view: string = 'month';
    user: UserLogin;

    constructor(
            public dialog: MdDialog,
            public store: Store<any>,
            public restservice: RestService) {
        this.meetings = this.store.select(store => store.slots);
        this.store.select(store => store.user).subscribe(user => {
            this.user = user;
        });
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
                if (this.user.role === 'stud') {
                    this.dialogRef2 = this.dialog.open(MeetingDialog, config);
                    this.dialogRef2.afterClosed().subscribe(result => {
                    });
                }
            }
        }
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

}
