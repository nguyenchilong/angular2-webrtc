import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'meetings-dialog',
    templateUrl: './meetings-dialog.template.html'
})

export class MeetingsDialog {

    events: any[];
    none: boolean = true;

    constructor(public dialogRef: MdDialogRef<MeetingsDialog>) {

     }

}
