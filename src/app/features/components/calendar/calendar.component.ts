import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MeetingsDialog } from '../../dialogs/meetings-dialog/meetings-dialog.component';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { RestService } from '../../../services/rest.service';
import { Slot } from '../../../model/slot';

class SlotCalendar {
    slot: Slot;
    start: Date;
    end: Date;
    color: Color;
}
class Color {
    primary: string;
    secondary: string;
}

@Component({
    selector: 'calendar-component',
    templateUrl: './calendar.template.html',
    styleUrls: ['./calendar.style.css'],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

    slots: Array<SlotCalendar> = [];
    dialogRef: MdDialogRef<MeetingsDialog>;
    dialogRef2: MdDialogRef<MeetingDialog>;
    viewDate: Date = new Date();
    view: string = 'month';

    constructor(
            public dialog: MdDialog,
            public store: Store<any>,
            public restservice: RestService) {
        this.store.select(store => store.slots).subscribe((slots: Array<Slot>) => {
            this.slots = this.convertSlotsToCalendar(slots);
        });
    }

    ngOnInit() {
    }

    switchToMonth(): void {
        this.view = 'month';
    }

    switchToWeek(): void {
        this.view = 'week';
    }

    switchToDay(): void {
        this.view = 'day';
    }

    dayClicked(e): void {
        this.openDialog(e);
    }

    openDialog(e) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(MeetingsDialog, config);

        // if single event from weekview
        if (e.event) {
            this.dialogRef.componentInstance.slots = this.convertSlotsFromCalendar([e.event]);
        } else {
            // if events is empty
            this.dialogRef.componentInstance.slots = this.convertSlotsFromCalendar(e.events);
            if (e.events.length !== 0) {
            } else {
                this.dialogRef.close();
                let userRole = localStorage.getItem('user_role');
                if (userRole === 'ROLE_STUDENT') {
                    this.dialogRef2 = this.dialog.open(MeetingDialog, config);
                    this.dialogRef2.afterClosed().subscribe(result => {});
                }
            }
        }
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {});
    }

    private convertSlotsToCalendar(slots: Array<Slot>): Array<SlotCalendar> {
        let result: Array<SlotCalendar> = [];
        for (let slot of slots) {
            result = result.concat([{
                slot: slot,
                start: slot.date,
                end: slot.date,
                color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3'
                }
            }]);
        }
        console.log(result);
        return result;
    }

    private convertSlotsFromCalendar(slots: Array<SlotCalendar>): Array<Slot> {
        let result: Array<Slot> = [];
        for (let slot of slots) {
            result = result.concat([slot.slot]);
        }
        console.log(result);
        return result;
    }

}
