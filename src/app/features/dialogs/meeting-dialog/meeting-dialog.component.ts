import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    selectedperson: any;
    user: Observable<any>;

    constructor(
        public dialogRef: MdDialogRef<MeetingDialog>,
        public store: Store<any>,
        private formBuilder: FormBuilder
    ) {
        this.persons = this.store.select(store => store.persons);
        this.persons.subscribe((data) => {
            this.pers = data;
        });
        this.persons.first().subscribe(data => {
            this.selectedperson = data[0];
            console.log(data[0]);
        });
        this.createform = this.formBuilder.group({
            title: '',
            info: ''
        });
        this.user = this.store.select(store => store.user);
    }

    save(): void {
        //
        let init: any = {
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
        this.store.dispatch({ type: 'ADD_MEETING', payload: init });
    }
}

