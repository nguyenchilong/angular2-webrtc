import { Component } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { Slot } from '../../../model/slot';
import { UserLogin } from '../../../model/user-login';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    selector: 'meetings-dialog',
    templateUrl: './meetings-dialog.template.html',
    styleUrls: ['./meetings-dialog.style.css']
})
export class MeetingsDialog {

    slots: Array<Slot>;
    dialogRef2: MdDialogRef<MeetingDialog>;
    user: Observable<UserLogin>;

    constructor(
            public dialogRef: MdDialogRef<MeetingsDialog>,
            public dialog: MdDialog,
            private store: Store<any>) {
        this.user = this.store.select(store => store.user);
    }

    setSlots(slots: Array<Slot>) { // set externally by CalendarComponent.openDialog()
        this.slots = slots;
    }

    openDialog(slot: Slot) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef2 = this.dialog.open(MeetingDialog, config);
        this.dialogRef2.componentInstance.setSlot(slot);
        // when closing dialog
        this.dialogRef2.afterClosed().subscribe(result => { });
        this.dialogRef.close();
    }

}
