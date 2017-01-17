import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'createMeeting-component',
    templateUrl: './createMeeting-dialog.template.html'
})

export class CreateMeetingComponent {

    meetingGroup: FormGroup;

    constructor(
        public dialogRef: MdDialogRef<CreateMeetingComponent>,
        public formBuilder: FormBuilder) {
        let today = moment(new Date()).format('YYYY' + '-' + 'MM' + '-' + 'DD');
        this.meetingGroup = this.formBuilder.group({
            day: today,
            start: '10:00',
            end: '11:30',
        });
    }

    create(): void {
        this.dialogRef.close();
    }
}
