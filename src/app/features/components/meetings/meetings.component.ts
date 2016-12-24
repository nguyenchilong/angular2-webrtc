import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { Slot } from '../../../model/slot';
import { UserLogin } from '../../../model/user-login';

@Component({
    selector: 'meetings-component',
    templateUrl: './meetings.template.html',
    styleUrls: ['./meetings.style.css']

})
export class MeetingsCompontent {

    meetings: Observable<Array<Slot>>;
    dialogRef: MdDialogRef<MeetingDialog>;
    user: Observable<UserLogin>;

    constructor(
            private store: Store<any>,
            public dialog: MdDialog) {
        this.meetings = this.store.select(store => store.slots);
        this.user = this.store.select(store => store.user);
    };

    create(): void {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

    openDialog(meeting) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);

        this.dialogRef.componentInstance.meeting = meeting;

        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }
}
