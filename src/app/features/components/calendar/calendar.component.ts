import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MeetingsDialog } from '../../dialogs/meetings-dialog/meetings-dialog.component';
import { MeetingDialog } from '../../dialogs/meeting-dialog/meeting-dialog.component';
import { RestService } from '../../../services/rest.service';
import { Slot } from '../../../model/slot';
import * as moment from 'moment';

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

    slots: Observable<any>;
    dialogRef: MdDialogRef<MeetingsDialog>;
    dialogRef2: MdDialogRef<MeetingDialog>;
    viewDate: Date = new Date();
    view: string = 'month';
    viewMonth: string = '';
    viewDay: string = '';
    viewYear: string = '';

    constructor(
        public dialog: MdDialog,
        public store: Store<any>,
        public restservice: RestService) {
        this.slots = this.store.select(store => store.slots).map((slots) => {
            return this.convertSlotsToCalendar(slots);
        });
    }

    ngOnInit() {
        this.updateViewDay(this.viewDate);
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

    incrementMonth(): void {
        this.viewDate = moment(this.viewDate).add(1, 'months').toDate();
        this.updateViewDay(this.viewDate);
    }

    decrementMonth(): void {
        this.viewDate = moment(this.viewDate).subtract(1, 'months').toDate();
        this.updateViewDay(this.viewDate);
    }

    incrementDay(): void {
        this.viewDate = moment(this.viewDate).add(1, 'days').toDate();
        this.updateViewDay(this.viewDate);
    }

    decrementDay(): void {
        this.viewDate = moment(this.viewDate).subtract(1, 'days').toDate();
        this.updateViewDay(this.viewDate);
    }

    updateViewDay(date): void {
        this.viewMonth = date.toLocaleString('en-us', { month: 'long' });
        this.viewDay = moment(date).get('date').toString();
        this.viewYear = moment(date).get('year').toString();
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
                    this.dialogRef2.afterClosed().subscribe(result => { });
                }
            }
        }
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => { });
    }

    private convertSlotsToCalendar(slots: Array<Slot>) {
        let result: any[] = [];
        for (let slot of slots) {
            result = result.concat([{
                title: slot.name,
                start: moment(slot.date).toDate(),
                end: moment(slot.date).add(slot.duration, 'minutes').toDate(),
                color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3'
                },
                comment: slot.comment,
                duration: slot.duration,
                status: slot.status,
                date: slot.date,
                name: slot.name,
                professor: slot.professor,
                student: slot.student,
                meeting: slot.meeting,
                id: slot.id
            }]);
        }
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
