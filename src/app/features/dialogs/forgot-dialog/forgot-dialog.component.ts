import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'forgot-dialog',
    templateUrl: './forgot-dialog.template.html',
    styleUrls: ['./forgot-dialog.style.css']
})
export class ForgotDialog {

    constructor(public dialogRef: MdDialogRef<ForgotDialog>) {

     }

}
