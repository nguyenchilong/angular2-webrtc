import { Component } from '@angular/core';
import { RestService } from '../../../services/rest.service';

@Component({
    selector: 'meetings-component',
    templateUrl: './meetings.template.html',
    styleUrls: ['./meetings.style.css']

})

export class MeetingsCompontent {

    meetings: any[];

    constructor(private restservice: RestService) {
        this.meetings = this.restservice.getMeetings();
      };

}
