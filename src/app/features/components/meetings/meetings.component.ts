import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { Slot } from '../../../model/slot';
import { UserLogin } from '../../../model/user-login';
// Test imports, remove when done
import { WampService } from '../../../services/wamp.service';
import { RestService } from '../../../services/rest.service';
import { MeetingProfessor } from '../../../model/meeting-professor';

@Component({
    selector: 'meetings-component',
    templateUrl: './meetings.template.html',
    styleUrls: ['./meetings.style.css']
})
export class MeetingsCompontent {

    slots: Observable<Array<Slot>>;
    dialogRef: MdDialogRef<MeetingDialog>;
    user: Observable<UserLogin>;

    constructor(
        private store: Store<any>,
        private dialog: MdDialog,
        private wampservice: WampService,
        private restservice: RestService
    ) {
        this.slots = this.store.select(store => store.slots);
        this.user = this.store.select(store => store.user);
    };

    create(): void {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

    openDialog(slot: Slot) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingDialog, config);

        this.dialogRef.componentInstance.slot = slot;

        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => { });
    }
    //  SOME TEST:
    testCall(): void {
        this.wampservice.sendWithSocket(206, {
            type: 'call',
            id: localStorage.getItem('user_id'),
            title: localStorage.getItem('user_title'),
            lastname: localStorage.getItem('user_lastname')
        })
            .subscribe(data => { });
    }
    createMeeting(): void {
        let d1 = new Date();
        let d2 = new Date();
        d1.setDate(new Date().getDate());
        d2.setDate(new Date().getDate() + 3);
        let meeting: MeetingProfessor = {
            slots: [],
            startDate: d1,
            endDate: d2,
            status: 'active'
        };
        this.restservice.createMeeting(meeting);
    }

}
