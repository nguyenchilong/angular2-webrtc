import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'createMeeting-component',
    templateUrl: './createMeeting-dialog.template.html'
})

export class CreateMeetingComponent {


    constructor(public dialogRef: MdDialogRef<CreateMeetingComponent>) {}

    create(): void {
        this.dialogRef.close();
    }
}
