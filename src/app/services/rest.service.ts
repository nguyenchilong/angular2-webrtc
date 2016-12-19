import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { REST } from './constants';
import { Store } from '@ngrx/store';

import { Test } from '../model/test';
import { User } from '../model/user';
import { Meeting } from '../model/meeting';
import { Slot } from '../model/slot';
import { StudyCourse } from '../model/study-course';
import { Error } from '../model/error';

@Injectable()
export class RestService {

    constructor(
        private http: Http,
        private store: Store<any>) {
    }

    authorizeUser(user: string, password: string): Observable<any> {
        let values: string = 'Basic ' + btoa(user + ':' + password);
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        headers.append('Authorization', values);
        return this.http.post(REST + '/tokens', {}, { headers: headers, withCredentials: true });
    }

    createUser(user: User): void {
        // POST /users
    }

    updateUserPassword(userId: number, oldPassword: string, newPasswordFirst: string, newPasswordSecond: string): void {
        // PATCH /users/{userId}/change-password
        let request = {
            "app_password[oldPassword]": oldPassword,
            "app_password[newPassword][first]": newPasswordFirst,
            "app_password[newPassword][second]": newPasswordSecond
        };
    }

    readProfessors(): void {
        // GET /users/professors
        
        // delete:
        let persons: Object = [
            {
                name: 'Prof. Dr. Ralf Kramer',//lastname
                id: 1,
                vorlesungen: [//studyCourses
                    {
                        title: 'Verteilte Systeme'//name
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

    readMeetings(): void {
  //readMeetings(userId: number, userRole: string): void {
        // GET /users/{userId}/meetings/professor
        // GET /users/{userId}/meetings/student

        console.log('getMeetings() called');
        let obs: Observable<Test> = this.http.get('http://ddaeuble.de/test.json')
                .map(res => res.json() as Test);
        obs.subscribe((resJson: Test) => console.log(resJson));

        //delete:
        let d1 = new Date();
        let d2 = new Date();
        let d3 = new Date();
        d1.setDate(new Date().getDate());
        d2.setDate(new Date().getDate() + 3);
        d3.setDate(new Date().getDate() + 7);
        let data = [
            {
                id: 1,
                title: 'Besprechung',
                start: d1,
                end: d1,
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
                start: d2,
                end: d2,
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
                start: d3,
                end: d3,
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

    createSlot(meedingId: number, name: string, duration: number, comment: string): void {
        // POST /meetings/{meetingId}/slots
        let request = {
            "app_slot[name]": name,
            "app_slot[duration]": duration,
            "app_slot[comment]": comment
        };
    }

    updateSlot(meetingId: number, slotId: number, duration: number, comment: string, status: string): void {
        // PATCH /meetings/{meetingId}/slots/{slotId}
        let request = {
            "app_slot[duration]": duration,
            "app_slot[comment]": comment,
            "app_slot[status]": status
        };
    }

    readSlots(userId: number, meeting: Meeting): void {
        // GET /users/{userId}/slots
    }

    updateMeeting(meetingId: number): void {
        // PUT /meetings/{meetingId}
    }

}
