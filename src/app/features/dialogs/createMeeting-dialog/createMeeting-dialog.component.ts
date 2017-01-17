import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { RestService } from '../../../services/rest.service';

@Component({
    selector: 'createMeeting-component',
    templateUrl: './createMeeting-dialog.template.html'
})

export class CreateMeetingComponent {

    meetingGroup: FormGroup;

    constructor(
        public dialogRef: MdDialogRef<CreateMeetingComponent>,
        public formBuilder: FormBuilder,
        public rest: RestService) {
        let today = moment(new Date()).format('YYYY' + '-' + 'MM' + '-' + 'DD');
        this.meetingGroup = this.formBuilder.group({
            day: [today, Validators.required],
            start: ['10:00', Validators.required],
            end: ['11:30', Validators.required]
        });
    }

    create(): void {
        this.dialogRef.close();
    }
}
