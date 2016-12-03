import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'meeting-dialog',
    templateUrl: './meeting-dialog.template.html',
    styleUrls: ['./meeting-dialog.style.css']
})

export class MeetingDialog {

    meeting: any;
    persons: Observable<any>;
    pers: any;
    durationoptions: any[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    createform: FormGroup;

    constructor(
        public dialogRef: MdDialogRef<MeetingDialog>,
        public store: Store<any>,
        private formBuilder: FormBuilder
    ) {
        this.persons = this.store.select(store => store.persons);
        this.persons.subscribe((data) => {
            this.pers = data;
        });
        this.createform = this.formBuilder.group({
            title: '',
            info: ''
        });
    }

    setSelectedPerson(e): void {
        // e is the id of the persons
        // todo: push to store and to restservice
        console.log(e);
    }

    save(): void {
        // 
    }
}

