import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';



@Component({
    selector: 'meetings-component',
    templateUrl: './meetings.template.html',
    styleUrls: ['./meetings.style.css']

})

export class MeetingsCompontent {

    meetings: Observable<any>;
    meeting1: any = {
        id: 4,
        title: 'Hinzugefügt',
        start: new Date(),
        end: new Date(),
        color: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        prof: 'Hinzugefügt',
        vorlesung: '1312313',
        time: '123123'
    };

    meeting2: any = {
        id: 4,
        title: 'Ersetzt',
        start: new Date(),
        end: new Date(),
        color: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        prof: 'Ersetzt',
        vorlesung: '1312313',
        time: '123123'
    };

    dialogRef: MdDialogRef<MeetingDialog>;

    constructor(
        private store: Store<any>,
        public dialog: MdDialog
    ) {
        this.meetings = this.store.select(store => store.meetings);
    };

    click(): void {
        this.store.dispatch({ type: 'ADD_MEETING', payload: this.meeting1 });
    }
    remove(): void {
        this.store.dispatch({ type: 'REMOVE_MEETING', payload: this.meeting1 });
    }
    replace(): void {
        this.store.dispatch({ type: 'REPLACE_MEETING', payload: this.meeting2 });
    }

    create(): void {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

    openDialog(meeting) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);

        this.dialogRef.componentInstance.meeting = meeting;

        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }
}
