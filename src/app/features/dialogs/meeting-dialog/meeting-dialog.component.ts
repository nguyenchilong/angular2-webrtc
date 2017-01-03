import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professor } from '../../../model/professor';
import { Slot } from '../../../model/slot';
import { StudyCourse } from '../../../model/study-course';
import { UserLogin } from '../../../model/user-login';
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
    slot: Slot; // set externally by MeetingsComponent.openDialog() and MeetingsDialog.openDialog()
    professors: Array<Professor>;
    selectedProfessor: Professor;
    selectedStudiecourse: StudyCourse;
    selectedDuration: number;
    profname: string = '';
    studname: string = '';

    constructor(
        public dialogRef: MdDialogRef<MeetingDialog>,
        public store: Store<any>,
        private formBuilder: FormBuilder,
        private wampservice: WampService) {
        this.store.select(store => store.professors).subscribe(prof => {
            this.professors = prof;
        });
        this.store.select(store => store.professors).first().subscribe(first => {
            // fill selectedProfessor and selectedStudiecourse
            if (localStorage.getItem('user_role') === 'ROLE_STUDENT') {
                console.log('LOOOOOG');
                console.log(first);
                this.selectedProfessor = first[0];
                this.selectedStudiecourse = this.selectedProfessor.studycourses[0];
            } else {
                // put data from gettet slot
                this.selectedProfessor = {
                    studycourses: [{
                        id: 1,
                        name: ''
                    }],
                    username: '',
                    roles: [],
                    firstname: '',
                    lastname: ''
                };
                this.selectedStudiecourse = {
                    id: 2,
                    name: ''
                };
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

    ngOnInit() {
        // change this:
        if (this.slot) {
            if (localStorage.getItem('user_role') === 'ROLE_STUDENT') {
                this.profname = this.slot.meeting.professor.title + ' ' + this.slot.meeting.professor.firstname + ' ' + this.slot.meeting.professor.lastname
            } else if (localStorage.getItem('user_role') === 'ROLE_PROF') {
                this.studname = this.slot.student.firstname + ' ' + this.slot.student.lastname;
            }
            // -----
        }
    }

    setSelectedProfessor(selectedprofessorId: string): void {
        this.selectedProfessor = _.find(this.professors, function (item) {
            return item.id === parseInt(selectedprofessorId);
        });
        if (this.selectedProfessor.studycourses[0]) {
            this.selectedStudiecourse = this.selectedProfessor.studycourses[0];
        }
    }

    setSelectedStudycourse(selectedstudiecourseid: string): void {
        this.selectedStudiecourse = _.find(this.selectedProfessor.studycourses, function (item) {
            return item.id === parseInt(selectedstudiecourseid);
        });
    }

    setSelectedDuration(selectedduration: string): void {
        this.selectedDuration = parseInt(selectedduration);
    }

    createRequest(): void {
        console.log('Ausgefählte Werte:');
        console.log(this.selectedProfessor);
        console.log(this.selectedStudiecourse);
        console.log(this.createForm.controls['name'].value);
        console.log(this.createForm.controls['comment'].value);
        console.log(this.selectedDuration);
        this.dialogRef.close();

        /*let init: Slot = {
            title: this.createform.get('name').value,
            color: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            },
            prof: this.selectedProfessor.name,
            vorlesung: 'Softwaremodellierung',
            info: this.createform.get('comment').value,
            duration: 25,
            time: 'Fr 13:30 01.12.16',
            status: 'created'
        };
        this.store.dispatch({ type: 'ADD_SLOT', payload: init });*/
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
        ).subscribe(data => { });
    }

    acceptSlot(): void {

    }

    rejectSlot(): void {

    }

    deleteSlot(): void {

    }

}

