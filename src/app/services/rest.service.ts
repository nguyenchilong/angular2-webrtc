import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { REST } from './constants';
import { Store } from '@ngrx/store';

@Injectable()

export class RestService {

    d1 = new Date();
    d2 = new Date();
    d3 = new Date();

    constructor(
        private http: Http,
        private store: Store<any>
    ) {
        this.d1.setDate(new Date().getDate());
        this.d2.setDate(new Date().getDate() + 3);
        this.d3.setDate(new Date().getDate() + 7);
    }

    authorizeUser(user: string, password: string): Observable<any> {
        let values: string = 'Basic ' + btoa(user + ':' + password);
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        headers.append('Authorization', values);
        return this.http.post('https://chor-am-killesberg.de:8001/web/app_test.php/tokens', {}, { headers: headers, withCredentials: true });
    }


    getMeetings(): void {
        let data = [
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
                info: 'Besprechen bzgl. 1 Abgabe',
                duration: 5,
                time: 'Mo 15:30 13.12.16',
                status: 'canceled'
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
                info: 'Besprechen bzgl. 1 Abgabe',
                duration: 15,
                time: 'Do 12:30 20.12.16',
                status: 'open'
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
                info: 'Besprechen bzgl. 1 Abgabe',
                duration: 25,
                time: 'Fr 13:30 01.12.16',
                status: 'accepted'
            }
        ];
        this.store.dispatch({ type: 'ADD_MEETINGS', payload: data });
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

    getUser(): Observable<any> {
        return this.http.post('url', {}, this.AuthHeaders);
    }

    getSlots(): Observable<any> {
        return this.http.post('url', {}, this.AuthHeaders);
    }

    getPersons(): void {
        // dummipersons
        let persons: Object = [
            {
                name: 'Prof. Dr. Ralf Kramer',
                id: 1,
                vorlesungen: [
                    {
                        title: 'Verteilte Systeme'
                    },
                    {
                        title: 'IT-Sicherheit'
                    }
                ]
            },
            {
                name: 'Prof. Dr. Oliver Höß',
                id: 2,
                vorlesungen: [
                    {
                        title: 'Verteilte Systeme',
                        id: 5
                    },
                    {
                        title: 'IT-Sicherheit',
                        id: 6
                    }
                ]
            },
        ];
        this.store.dispatch({ type: 'ADD_PERSONS', payload: persons });
    }
}

