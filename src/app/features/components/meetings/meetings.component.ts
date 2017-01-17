import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { CreateMeetingComponent } from '../../dialogs/createMeeting-dialog/createMeeting-dialog.component';
import { Slot } from '../../../model/slot';
import { UserLogin } from '../../../model/user-login';

@Component({
    selector: 'meetings-component',
    templateUrl: './meetings.template.html',
    styleUrls: ['./meetings.style.css']
})
export class MeetingsCompontent {

    slots: Observable<Array<Slot>>;
    dialogRef: MdDialogRef<MeetingDialog>;
    user: Observable<UserLogin>;
    createMeetingDialogRef: MdDialogRef<CreateMeetingComponent>;

    constructor(
            private store: Store<any>,
            private dialog: MdDialog) {
        this.slots = this.store.select(store => store.slots);
        this.user = this.store.select(store => store.user);
    };

    create(): void {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

    openDialog(slot: Slot) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);
        this.dialogRef.componentInstance.setSlot(slot);
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => { });
    }

    createMeeting(): void {
        let config: MdDialogConfig = { disableClose: false };
        this.createMeetingDialogRef = this.dialog.open(CreateMeetingComponent, config);
    }

}
