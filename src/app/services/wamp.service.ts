import { Injectable } from '@angular/core';
import { WAMP } from './constants';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class WampService {
    con: any;
    constructor(
        private http: Http
    ) { }

    initWamp(id): void {
        let conn = new ab.Session(
            // URL of socket
            WAMP,
            // onsuc:
            function () {

                conn.subscribe('signaling/' + id, function (topic, data) {
                    console.log(data);

                });

            },
            // on err
            function () {
            },
            { 'skipSubprotocolCheck': true }
        );
        this.con = conn;
    }

    sendOfferOrAnswer(): Observable<any> {
        let body = JSON.stringify({
            key: 'certificate_request',
            receiver: 'test2',
            certificate: 'sdfsdf'
        });
        let headers = new Headers();
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
