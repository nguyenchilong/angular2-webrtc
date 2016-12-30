import { Injectable } from '@angular/core';
import { WAMP, REST } from './constants';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class WampService {

    con: any;
    offerSubject: Subject<any> = new Subject();
    answerSubject: Subject<any> = new Subject();
    icecandidateSubject: Subject<any> = new Subject();
    callSubject: Subject<any> = new Subject();
    offerObservable: Observable<any> = this.offerSubject.asObservable();
    answerObservable: Observable<any> = this.answerSubject.asObservable();
    icecandidateObservable: Observable<any> = this.icecandidateSubject.asObservable();
    callObservable: Observable<any> = this.callSubject.asObservable();

    constructor(private http: Http) {
    }

    initWamp(id): void {
        this.con = new ab.Session(
            // URL of socket
            WAMP,
            // onsuc:
            () => {
                this.con.subscribe('signaling/' + id, (topic, data) => {
                    if (typeof data === typeof new Object()) {
                    } else {
                        let seri = JSON.parse(data);
                        let cert = JSON.parse(atob(seri.certificate));
                        if (cert.type === 'offer') {
                            this.offerSubject.next(cert);
                        } else if (cert.type === 'answer') {
                            this.answerSubject.next(cert);
                        } else if (cert.type === 'call') {
                            this.callSubject.next(cert);
                        } else {
                            this.icecandidateSubject.next(cert);
                        }
                    }
                    console.log(data);
                });
            },
            // on err
            function () {
            },
            { 'skipSubprotocolCheck': true }
        );
    }

    closeWamp(): void {
        this.con.close();
        this.answerSubject.complete();
        this.offerSubject.complete();
        this.icecandidateSubject.complete();
    }

    sendWithSocket(to, objecttosend): Observable<any> {
        let body = 'key=certificate_request&receiver=' + to + '&certificate=' + btoa(JSON.stringify(objecttosend));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(REST + '/certificate',
            body,
            {
                headers: headers,
                withCredentials: true
            });
    }

}
