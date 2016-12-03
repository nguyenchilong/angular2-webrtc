import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'meeting-dialog',
    templateUrl: './meeting-dialog.template.html',
    styleUrls: ['./meeting-dialog.style.css']
})

export class MeetingDialog {

    meeting: any;
    persons: Object = [
            {
                name: 'Prof. Dr. Ralf Kramer'
            },
            {
                name: 'Prof. Dr. Oliver Höß'
            },
        ]
    none: boolean = true;

    constructor(public dialogRef: MdDialogRef<MeetingDialog>) {

}

