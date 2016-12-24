import { Component } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { Slot } from '../../../model/slot';

@Component({
    selector: 'meetings-dialog',
    templateUrl: './meetings-dialog.template.html',
    styleUrls: ['./meetings-dialog.style.css']
})
export class MeetingsDialog {

    events: any[];
    dialogRef2: MdDialogRef<MeetingDialog>;


    constructor(
        public dialogRef: MdDialogRef<MeetingsDialog>,
        public dialog: MdDialog
    ) {

    }

    openDialog(slot: Slot) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef2 = this.dialog.open(MeetingDialog, config);
        this.dialogRef2.componentInstance.slot = slot;
        // when closing dialog
        this.dialogRef2.afterClosed().subscribe(result => {
        });
        this.dialogRef.close();
    }

}
