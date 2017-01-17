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
    today = moment(new Date()).format('YYYY' + '-' + 'MM' + '-' + 'DD');

    constructor(
        public dialogRef: MdDialogRef<CreateMeetingComponent>,
        public formBuilder: FormBuilder,
        public rest: RestService) {
        this.meetingGroup = this.formBuilder.group({
            day: [this.today, Validators.required],
            start: ['10:00', Validators.required],
            end: ['11:30', Validators.required]
        });
    }

    create(): void {
        let tag = this.meetingGroup.controls['day'].value;
        let tagtrans = tag.slice(8, 9) + '.' + tag.slice(5, 6) + '.' + tag.slice(0, 3);

        let start = tagtrans + ' ' + this.meetingGroup.controls['start'].value;
        let end = tagtrans + ' ' + this.meetingGroup.controls['end'].value;

        this.rest.createMeeting(start, end);

        this.dialogRef.close();
    }
}
