import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { REST } from './constants';
import { Store } from '@ngrx/store';

import { User } from '../model/user';
import { Professor } from '../model/professor';
import { Meeting } from '../model/meeting';
import { MeetingStudent } from '../model/meeting-student';
import { MeetingProfessor } from '../model/meeting-professor';
import { Slot } from '../model/slot';
import { Error } from '../model/error';

@Injectable()
export class RestService {

    constructor(
        private http: Http,
        private store: Store<any>) {
    }

    authorizeUser(username: string, password: string): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        let response: Observable<User> = this.http.post(REST + '/tokens', {}, { headers: headers, withCredentials: true })
                .map((res: Response) => res.json().user as User)
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('authorizeUser', response);
        return response;
    }

    createUser(user: User): Observable<User> {
        let response: Observable<User> = this.http.post(REST + '/users', user, { withCredentials: true })
                .map((res: Response) => res.json() as User)
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('createUser', response);
        return response;
    }

    updateUserPassword(oldPassword: string, newPassword: string): Observable<User> {
        let userId = localStorage.getItem('user_id');
        let requestBody = this.serializeAsUrlParams({
                'app_password[oldPassword]': oldPassword,
                'app_password[newPassword][first]': newPassword,
                'app_password[newPassword][second]': newPassword
        });
        let response: Observable<User> = this.http.patch(REST + '/users/' + userId + '/change-password', requestBody, { withCredentials: true })
                .map((res: Response) => res.json() as User)
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('updateUserPassword', response);
        return response;
    }

    readProfessors(): Observable<Array<Professor>> {
        let response: Observable<Array<Professor>> = this.http.get(REST + '/users/professors', { withCredentials: true })
                .map((res: Response) => res.json() as Array<Professor>)
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('readProfessors', response);
        response.subscribe((professors: Array<Professor>) => {
//this.store.dispatch({ type: 'CLEAR' });
                this.store.dispatch({ type: 'ADD_PROFESSORS', payload: professors });
        });

        // delete:
        let professors: Array<Professor> = [
            {
                id: 1,
                username: '',
                firstname: '',
                lastname: 'Prof. Dr. Ralf Kramer',
                roles: ['ROLE_PROF'],
                studycourses: [
                    {
                        id: 5,
                        name: 'Verteilte Systeme'
                    },
                    {
                        id: 6,
                        name: 'IT-Sicherheit'
                    }
                ]
            },
            {
                id: 2,
                username: '',
                firstname: '',
                lastname: 'Prof. Dr. Oliver Höß',
                roles: ['ROLE_PROF'],
                studycourses: [
                    {
                        id: 5,
                        name: 'Verteilte Systeme'
                    },
                    {
                        id: 6,
                        name: 'IT-Sicherheit'
                    }
                ]
            },
        ];
        this.store.dispatch({ type: 'ADD_PROFESSORS', payload: professors });

        return response;
    }

    readMeetings(): Observable<Array<Meeting>> {
        let userId = localStorage.getItem('user_id');
        let userRole = localStorage.getItem('user_role');
        let response: Observable<Array<Meeting>>;
        if (userRole === 'ROLE_PROF') {
            response = this.http.get(REST + '/users/' + userId + '/meetings/professor', { withCredentials: true })
                    .map((res: Response) => res.json() as Array<MeetingProfessor>)
                    .catch((err: any) => {
                            return Observable.throw(err.json());
                    });
        } else { // if userRole === 'ROLE_STUDENT'
            response = this.http.get(REST + '/users/' + userId + '/meetings/student', { withCredentials: true })
                    .map((res: Response) => res.json() as Array<MeetingStudent>)
                    .catch((err: any) => {
                            return Observable.throw(err.json());
                    });
        }
        this.printResponse('readMeetings', response);
        response.subscribe((meetings: Array<Meeting>) => {
                this.store.dispatch({ type: 'ADD_SLOTS', payload: meetings });
        });

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
        this.store.dispatch({ type: 'ADD_SLOTS', payload: data });

        return response;
    }

    createMeeting(meeting: MeetingProfessor): Observable<void> {
        let userId = localStorage.getItem('user_id');
        let response: Observable<void> = this.http.put(REST + '/users/' + userId + '/meetings', meeting, { withCredentials: true })
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('createMeeting', response);
        return response;
    }

    updateMeetingSimple(meetingId: number, meeting: Meeting): Observable<void> {
        return this.updateMeeting(meetingId, meeting.status);
    }
    updateMeeting(meetingId: number, newStatus: string): Observable<void> {
        let userId = localStorage.getItem('user_id');
        let requestBody = this.serializeAsUrlParams({
                'app_meeting_edit[status]': newStatus
        });
        let response: Observable<void> = this.http.put(REST + '/users/' + userId + '/meetings/' + meetingId, requestBody, { withCredentials: true })
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('updateMeeting', response);
        return response;
    }

    readSlots(): Observable<Array<Slot>> {
        let userId = localStorage.getItem('user_id');
        let response: Observable<Array<Slot>> = this.http.get(REST + '/users/' + userId + '/slots', { withCredentials: true })
                .map((res: Response) => res.json() as Array<Slot>)
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('readSlots', response);
        return response;
    }

    createSlotSimple(meetingId: number, slot: Slot): Observable<Array<Slot>> {
        return this.createSlot(meetingId, slot.name, slot.duration, slot.comment);
    }
    createSlot(meetingId: number, name: string, duration: number, comment: string): Observable<Array<Slot>> {
        let requestBody = this.serializeAsUrlParams({
                'app_slot_create[name]': name,
                'app_slot_create[duration]': duration,
                'app_slot_create[comment]': comment
        });
        let response: Observable<Array<Slot>> = this.http.post(REST + '/meetings/' + meetingId + '/slots', requestBody, { withCredentials: true })
                .map((res: Response) => res.json() as Array<Slot>)
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('createSlot', response);
        return response;
    }

    updateSlotSimple(meetingId: number, slot: Slot): Observable<void> {
        return this.updateSlot(meetingId, slot.id, slot.duration, slot.comment, slot.status);
    }
    updateSlot(meetingId: number, slotId: number, duration: number, comment: string, status: string): Observable<void> {
        let requestBody = this.serializeAsUrlParams({
                'app_slot_edit[duration]': duration,
                'app_slot_edit[comment]': comment,
                'app_slot_edit[status]': status
        });
        let response: Observable<void> = this.http.patch(REST + '/meetings/' + meetingId + '/slots/' + slotId, requestBody, { withCredentials: true })
                .catch((err: any) => {
                        return Observable.throw(err.json());
                });
        this.printResponse('updateSlot', response);
        return response;
    }

    private printResponse(functionName: string, response: Observable<any>) {
        response.subscribe(data => {
                console.log(functionName + '() = ' + JSON.stringify(data, null, 2));
        }, err => {
                if (typeof err === typeof Error) {
                        console.log(functionName + '() error = ' + JSON.stringify(err, null, 2));
                } else {
                        console.log(functionName + '() unknown error = ' + JSON.stringify(err, null, 2));
                }
        });
    };

    private serializeAsUrlParams(o: Object): string {
        var s = '';
        for (var key in o) {
            s += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(o[key]);
        }
        return s.slice(1);
    };

}
