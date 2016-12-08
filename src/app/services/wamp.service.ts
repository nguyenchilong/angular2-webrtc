import { Injectable } from '@angular/core';
import { WAMP } from './constants';
import { Http } from '@angular/http';
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
        this.sendOfferOrAnswer();
        console.log('send offer');
    }

    sendOfferOrAnswer(): any {
        return this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/certificate',
        {
            key: 'certificate_request'
        });
    }
    sendIceCandidate(): void {
        this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/certificate', {});

    }

}
