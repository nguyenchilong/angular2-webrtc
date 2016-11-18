import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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

    constructor(
        private store: Store<any>
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

}
