import { Component } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    selector: 'meetings-component',
    templateUrl: './meetings.template.html',
    styleUrls: ['./meetings.style.css']

})

export class MeetingsCompontent {

    meetings: Observable<any>;

    constructor(
        private restservice: RestService,
        private store: Store<any>
        ) {
        this.meetings = this.store.select(store => store.meetings);
        this.restservice.callApi().subscribe(msg => console.log(JSON.parse(msg._body)));
      };

}
