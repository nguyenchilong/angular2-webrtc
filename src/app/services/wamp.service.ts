import { Injectable } from '@angular/core';
import { WAMP } from './constants';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
@Injectable()

export class WampService {
    con: any;
    signaling: Subject<any> = new Subject();
    constructor(
        private http: Http
    ) { }

    initWamp(id): void {
        this.con = new ab.Session(
            // URL of socket
            WAMP,
            // onsuc:
            () => {
                this.con.subscribe('signaling/' + id, (topic, data) => {
                    this.signaling.next(data);
                    console.log(data.key);
                });
            },
            // on err
            function () {
            },
            { 'skipSubprotocolCheck': true }
        );
    }


    sendOfferOrAnswer(to, offeroranswer): Observable<any> {
        let body = 'key=certificate_request&receiver=' + to + '&certificate=' + offeroranswer;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/certificate',
        body,
        {
            headers: headers,
            withCredentials: true
        });
    }
    sendIceCandidate(): void {
        this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/certificate', {}, {});

    }

}
