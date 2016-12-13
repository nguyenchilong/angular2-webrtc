import { Injectable } from '@angular/core';
import { WAMP } from './constants';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
@Injectable()

export class WampService {
    con: any;
    offer: Subject<any> = new Subject();
    answer: Subject<any> = new Subject();
    offerObservable: Observable<any> = this.offer.asObservable();
    icecandidate: Subject<any> = new Subject();
    icecandidateObservable: Observable<any> = this.icecandidate.asObservable();
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
                    if (typeof data === typeof new Object()) {
                        console.log(data);
                    } else {
                        let seri = JSON.parse(data);
                        let cert = JSON.parse(atob(seri.certificate));
                        if (cert.type === 'offer') {
                            this.offer.next(cert);
                        } else if (cert.type === 'answer') {
                            this.answer.next(cert);
                        } else {
                            this.icecandidate.next(cert);
                        }
                    }
                });
            },
            // on err
            function () {
            },
            { 'skipSubprotocolCheck': true }
        );
    }


    sendWithSocket(to, objecttosend): Observable<any> {
        let body = 'key=certificate_request&receiver=' + to + '&certificate=' + btoa(JSON.stringify(objecttosend));
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
