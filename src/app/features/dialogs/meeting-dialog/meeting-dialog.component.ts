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

    createForm: FormGroup;
    durationOptions: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    user: Observable<UserLogin>;
    slot: Slot; // set externally by MeetingsComponent.openDialog() and MeetingsDialog.openDialog()
    professors: Observable<Array<Professor>>;
    selectedProfessor: Professor;

    constructor(
            public dialogRef: MdDialogRef<MeetingDialog>,
            public store: Store<any>,
            private formBuilder: FormBuilder) {
        this.professors = this.store.select(store => store.professors);
        this.professors.first().subscribe(firstProfessor => {
            this.selectedProfessor = firstProfessor[0];
        });
        this.createForm = this.formBuilder.group({
            name: '',
            comment: ''
        });
        this.user = this.store.select(store => store.user);
    }

    setSelectedProfessor(professorId: number) {
        //TODO set this.selectedProfessor
    }

    save(): void {
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

    }

    acceptSlot(): void {

    }

    rejectSlot(): void {

    }

    deleteSlot(): void {

    }

}

