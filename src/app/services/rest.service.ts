import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { REST } from './constants';

@Injectable()

export class RestService {

    d1 = new Date();
    d2 = new Date();
    d3 = new Date();

    constructor(private http: Http) {
        this.d1.setDate(new Date().getDate());
        this.d2.setDate(new Date().getDate() + 3);
        this.d3.setDate(new Date().getDate() + 7);
    }

    authorizeUser(user: string, password: string): Observable<any> {
        let values: string = 'Basic ' + btoa(user + ':' + password);
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        headers.append('Authorization', values);
        return this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/tokens', {}, { headers: headers });
    }


    getMeetings(): any {
        return [
            {
                id: 1,
                title: 'Besprechung',
                start: this.d1,
                end: this.d1,
                color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3'
                },
                prof: 'Prof. Dr. Otto Offline',
                vorlesung: 'Mathe 1/2',
                time: 'Mo 15:30 13.12.16'
            },
            {
                id: 2,
                title: 'Bachelorarbeit',
                start: this.d2,
                end: this.d2,
                color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3'
                },
                prof: 'Prof. Dr. Ralf Kramer',
                vorlesung: 'Datenbanksysteme',
                time: 'Do 12:30 20.12.16'
            },
            {
                id: 3,
                title: 'Frage zur Übung 05',
                start: this.d3,
                end: this.d3,
                color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3'
                },
                prof: 'Prof. Dr. Oliver Höß',
                vorlesung: 'Softwaremodellierung',
                time: 'Fr 13:30 01.12.16'
            }
        ];
    }

    test(): Observable<any> {
        return this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/hello', {}, this.AuthHeaders());
    }

    AuthHeaders(): Object {
        let authToken = localStorage.getItem('retain_token');
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${authToken}`);
        return { headers: headers };
    }
}

