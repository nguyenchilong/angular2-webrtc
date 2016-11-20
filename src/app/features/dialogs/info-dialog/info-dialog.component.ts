import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'calendar-dialog',
    templateUrl: './info-dialog.template.html',
    styleUrls: ['./info-dialog.style.css']
})
export class InfoDialog {

    constructor(public dialogRef: MdDialogRef<InfoDialog>) {

     }

}
