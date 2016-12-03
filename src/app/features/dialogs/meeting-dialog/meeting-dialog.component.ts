import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    selector: 'meeting-dialog',
    templateUrl: './meeting-dialog.template.html',
    styleUrls: ['./meeting-dialog.style.css']
})

export class MeetingDialog {

    meeting: any;
    persons: Observable<any>;
    none: boolean = true;

    constructor(
        public dialogRef: MdDialogRef<MeetingDialog>,
        public store: Store<any>
    ) {
        this.persons = this.store.select(store => store.persons);
    }
}

