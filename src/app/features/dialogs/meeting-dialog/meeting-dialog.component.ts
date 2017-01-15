import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professor } from '../../../model/professor';
import { Slot } from '../../../model/slot';
import { Meeting } from '../../../model/meeting';
import { UserLogin } from '../../../model/user-login';
import { RestService } from '../../../services/rest.service';
import * as _ from 'lodash';
import { WampService } from '../../../services/wamp.service';

@Component({
    selector: 'meeting-dialog',
    templateUrl: './meeting-dialog.template.html',
    styleUrls: ['./meeting-dialog.style.css']
})
export class MeetingDialog implements OnInit {

    createForm: FormGroup;
    durationOptions: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    user: Observable<UserLogin>;
    slotId: number;
    slot: Slot;
    professors: Array<Professor>;
    selectedProfessor: Professor;
    selectedMeeting: Meeting;
    selectedDuration: number;
    profname: string = '';
    studname: string = '';

    constructor(
            public dialogRef: MdDialogRef<MeetingDialog>,
            public store: Store<any>,
            private formBuilder: FormBuilder,
            private wampservice: WampService,
            private router: Router,
            private rest: RestService) {
        this.store.select((slots: Array<Slot>) => {
            for (let slot of slots) {
                if (slot.id === this.slotId) {
                    return slot;
                }
            }
            return null;
        }).subscribe((slot: Slot) => {
            this.slot = slot;
        });
        this.store.select(store => store.professors).subscribe(professors => {
            this.professors = professors;
        });
        this.store.select(store => store.professors).first().subscribe(first => {
            // fill selectedProfessor and selectedMeeting
            if (localStorage.getItem('user_role') === 'ROLE_STUDENT') {
//TODO
                this.selectedProfessor = first[0];
                this.selectedMeeting = this.selectedProfessor.meetings[0];
            } else {
                // put data from getted slot
//TODO
                /*this.selectedProfessor = {
                    studycourses: [{
                        id: 1,
                        name: ''
                    }],
                    username: '',
                    roles: [],
                    firstname: '',
                    lastname: ''
                };*/
                this.selectedProfessor = null;
                /*this.selectedMeeting = {
                    id: 2,
                    name: ''
                };*/
                this.selectedMeeting = null;
            }
            this.professors = first;
        });
        this.createForm = this.formBuilder.group({
            name: '',
            comment: ''
        });
        this.selectedDuration = this.durationOptions[0];
        this.user = this.store.select(store => store.user);
    }

    public setSlot(slot: Slot) { // used externally by MeetingsComponent.openDialog() and MeetingsDialog.openDialog()
        this.slotId = slot.id;
        this.slot = slot;
    }

    ngOnInit() {
        // change this:
        if (this.slot) {
            if (localStorage.getItem('user_role') === 'ROLE_STUDENT') {
                this.profname = this.slot.meeting.professor.title + ' ' + this.slot.meeting.professor.firstname + ' ' + this.slot.meeting.professor.lastname;
            } else if (localStorage.getItem('user_role') === 'ROLE_PROF') {
                this.studname = this.slot.student.firstname + ' ' + this.slot.student.lastname;
            }
//TODO
        }
    }

    setSelectedProfessor(selectedprofessorId: string): void {
        this.selectedProfessor = _.find(this.professors, function (item) {
            return item.id === parseInt(selectedprofessorId);
        });
        if (this.selectedProfessor.meetings[0]) {
            this.selectedMeeting = this.selectedProfessor.meetings[0];
        }
    }

    setSelectedMeeting(selectedMeetingId: string): void {
        this.selectedMeeting = _.find(this.selectedProfessor.meetings, function (item) {
            return item.id === parseInt(selectedMeetingId);
        });
    }

    setSelectedDuration(selectedduration: string): void {
        this.selectedDuration = parseInt(selectedduration);
    }

    createSlot(): void {
        let slot: Slot = {
            name: this.createForm.controls['name'].value,
            duration: this.selectedDuration,
            comment: this.createForm.controls['comment'].value,
            status: 'OPEN', // not necessary for creating - gets set by serverside
            meeting: this.selectedMeeting,
            student: JSON.parse(localStorage.getItem('user')), // not necessary for creating - logged-in user automatically gets used in RestService
            professor: this.selectedProfessor // not necessary for creating - redundant as this is also fixed by setting the meeting
        };
        this.rest.createSlotSimple(slot);
        this.dialogRef.close();
    }

    acceptSlot(): void {
        let oldStatus = this.slot.status;
        let newStatus = 'ACCEPTED';
        let oldDuration = this.slot.duration;
        let newDuration = this.selectedDuration;
        let oldComment = this.slot.comment;
        let newComment = this.createForm.controls['comment'].value;
        this.store.dispatch({ type: 'UPDATE_SLOT_STATUS_COMMENT_DURATION', payload: {slotId: this.slot.id, status: newStatus, comment: newComment, duration: newDuration} });
        this.rest.updateSlot(this.slot.meeting.id, this.slot.id, newDuration, newComment, newStatus).subscribe(
            success => {
                this.dialogRef.close(); // as the dialog-data does not get updated/reloaded after updating on the server was done (we need to reopen this dialog), automatically close this dialog
            },
            err => {
                this.store.dispatch({ type: 'UPDATE_SLOT_STATUS_COMMENT_DURATION', payload: {slotId: this.slot.id, status: oldStatus, comment: oldComment, duration: oldDuration} });
            }
        );
    }

    declineSlot(): void {
        let oldStatus = this.slot.status;
        let newStatus = 'DECLINED';
        let oldDuration = this.slot.duration;
        let newDuration = this.selectedDuration;
        let oldComment = this.slot.comment;
        let newComment = this.createForm.controls['comment'].value;
        this.store.dispatch({ type: 'UPDATE_SLOT_STATUS_COMMENT_DURATION', payload: {slotId: this.slot.id, status: newStatus, comment: newComment, duration: newDuration} });
        this.rest.updateSlot(this.slot.meeting.id, this.slot.id, newDuration, newComment, newStatus).subscribe(
            success => {
                this.dialogRef.close(); // as the dialog-data does not get updated/reloaded after updating on the server was done (we need to reopen this dialog), automatically close this dialog
            },
            err => {
                this.store.dispatch({ type: 'UPDATE_SLOT_STATUS_COMMENT_DURATION', payload: {slotId: this.slot.id, status: oldStatus, comment: oldComment, duration: oldDuration} });
            }
        );
    }

    cancelSlot(): void {
        let oldStatus = this.slot.status;
        let newStatus = 'CANCELED';
        let oldDuration = this.slot.duration;
        let oldComment = this.slot.comment;
        this.store.dispatch({ type: 'UPDATE_SLOT_STATUS_COMMENT_DURATION', payload: {slotId: this.slot.id, status: newStatus, comment: oldComment, duration: oldDuration} });
        this.rest.updateSlot(this.slot.meeting.id, this.slot.id, oldDuration, oldComment, newStatus).subscribe(
            success => {
                this.dialogRef.close(); // as the dialog-data does not get updated/reloaded after updating on the server was done (we need to reopen this dialog), automatically close this dialog
            },
            err => {
                this.store.dispatch({ type: 'UPDATE_SLOT_STATUS_COMMENT_DURATION', payload: {slotId: this.slot.id, status: oldStatus, comment: oldComment, duration: oldDuration} });
            }
        );
    }

    joinSlot(): void {
        this.wampservice.sendWithSocket(
            this.slot.student.id,
            {
                type: 'call',
                id: localStorage.getItem('user_id'),
                title: localStorage.getItem('user_title'),
                lastname: localStorage.getItem('user_lastname')
            }
        ).subscribe(data => {
            this.router.navigate(['receiver']);
            this.dialogRef.close();
        });
    }

}

