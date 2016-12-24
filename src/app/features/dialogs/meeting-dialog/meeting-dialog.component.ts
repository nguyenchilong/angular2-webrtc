import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professor } from '../../../model/professor';
import { Slot } from '../../../model/slot';
import { UserLogin } from '../../../model/user-login';

@Component({
    selector: 'meeting-dialog',
    templateUrl: './meeting-dialog.template.html',
    styleUrls: ['./meeting-dialog.style.css']
})

export class MeetingDialog {

    meeting: Slot;
    persons: Observable<Array<Professor>>;
    pers: Array<Professor>;
    durationoptions: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    createform: FormGroup;
    selectedperson: Professor;
    user: Observable<UserLogin>;

    constructor(
        public dialogRef: MdDialogRef<MeetingDialog>,
        public store: Store<any>,
        private formBuilder: FormBuilder
    ) {
        this.persons = this.store.select(store => store.professors);
        this.persons.subscribe((persons: Array<Professor>) => {
            this.pers = persons;
        });
        this.persons.first().subscribe(data => {
            this.selectedperson = data[0];
        });
        this.createform = this.formBuilder.group({
            title: '',
            info: ''
        });
        this.user = this.store.select(store => store.user);
    }

    save(): void {
        //
        /*let init: Slot = {
            title: this.createform.get('title').value,
            color: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            },
            prof: this.selectedperson.name,
            vorlesung: 'Softwaremodellierung',
            info: this.createform.get('info').value,
            duration: 25,
            time: 'Fr 13:30 01.12.16',
            status: 'created'
        };
        this.store.dispatch({ type: 'ADD_SLOT', payload: init });*/
    }

    joinMeeting(): void {

    }

    acceptMeeting(): void {

    }

    rejectMeeting(): void {

    }

    deleteMeeting(): void {

    }
}

