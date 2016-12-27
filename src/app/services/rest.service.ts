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
            }
            );
        this.printResponse('authorizeUser', response);
        // response.subscribe() is done in LoginComponent.login()
        return response;
    }

    logoutUser(): void {
        this.http.delete(REST + '/tokens', { withCredentials: true }).subscribe(data => { });
    }

    createUser(user: User): Observable<User> {
        let response: Observable<User> = this.http.post(REST + '/users', user, { withCredentials: true })
            .map((res: Response) => res.json() as User)
            .catch((err: any) => {
                return Observable.throw(err.json());
            }
            );
        this.printResponse('createUser', response);
        // no response.subscribe() necessary
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
            }
            );
        this.printResponse('updateUserPassword', response);
        // no response.subscribe() necessary
        return response;
    }

    readProfessors(): Observable<Array<Professor>> {
        let response: Observable<Array<Professor>> = this.http.get(REST + '/users/professors', { withCredentials: true })
            .map((res: Response) => res.json() as Array<Professor>)
            .catch((err: any) => {
                return Observable.throw(err.json());
            }
            );
        this.printResponse('readProfessors', response);
        response.subscribe((professors: Array<Professor>) => {

            //TODO remove dummy data:
            professors = professors.concat([
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
            ]);

            this.store.dispatch({ type: 'SET_PROFESSORS', payload: professors });
        });
        return response;
    }

    readMeetings(professorId: number): Observable<Array<Meeting>> {
        let userRole = localStorage.getItem('user_role');
        let response: Observable<Array<Meeting>>;
        if (userRole === 'ROLE_PROF') {
            response = this.http.get(REST + '/users/' + professorId + '/meetings/professor', { withCredentials: true })
                .map((res: Response) => res.json() as Array<MeetingProfessor>)
                .catch((err: any) => {
                    return Observable.throw(err.json());
                }
                );
        } else { // if userRole === 'ROLE_STUDENT'
            response = this.http.get(REST + '/users/' + professorId + '/meetings/student', { withCredentials: true })
                .map((res: Response) => res.json() as Array<MeetingStudent>)
                .catch((err: any) => {
                    return Observable.throw(err.json());
                }
                );
        }
        this.printResponse('readMeetings', response);
        //TODO push to store...
        return response;
    }

    createMeeting(meeting: MeetingProfessor): Observable<void> {
        let userId = localStorage.getItem('user_id');
        let requestBody = this.serializeAsUrlParams(meeting);
        let response: Observable<void> = this.http.put(REST + '/users/' + userId + '/meetings', requestBody, { withCredentials: true })
            .catch((err: any) => {
                return Observable.throw(err.json());
            }
            );
        this.printResponse('createMeeting', response);
        //TODO push to store...
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
            }
            );
        this.printResponse('updateMeeting', response);
        // no response.subscribe() necessary
        return response;
    }

    readSlots(): Observable<Array<Slot>> {
        let userId = localStorage.getItem('user_id');
        let response: Observable<Array<Slot>> = this.http.get(REST + '/users/' + userId + '/slots', { withCredentials: true })
            .map((res: Response) => res.json() as Array<Slot>)
            .catch((err: any) => {
                return Observable.throw(err.json());
            }
            );
        this.printResponse('readSlots', response);
        response.subscribe((slots: Array<Slot>) => {

            //TODO remove dummy data:
            let d1 = new Date();
            let d2 = new Date();
            let d3 = new Date();
            d1.setDate(new Date().getDate());
            d2.setDate(new Date().getDate() + 3);
            d3.setDate(new Date().getDate() + 7);
            slots = slots.concat([
                {
                    id: 1,
                    name: 'Besprechung',
                    duration: 15,
                    date: d1,
                    comment: 'Besprechen bzgl. 1 Abgabe',
                    status: 'CANCELED',
                    meeting: {
                        id: 1,
                        startDate: d1,
                        endDate: d1,
                        status: 'active',
                        professor: {
                            id: 0,
                            username: 'dummy',
                            roles: ['ROLE_PROF'],
                            title: 'Prof. Dr.',
                            firstname: 'Otto',
                            lastname: 'Offline',
                            studycourses: [
                                {
                                    id: 1,
                                    name: 'Mathe 1/2'
                                }
                            ]
                        }
                    },
                    student: {
                        id: 0,
                        username: 'dummy',
                        roles: ['ROLE_STUDENT'],
                        firstname: 'dummy',
                        lastname: 'dummy'
                    }
                },
                {
                    id: 2,
                    name: 'Bachelorarbeit',
                    duration: 10,
                    date: d2,
                    comment: 'Besprechen bzgl. 1 Abgabe',
                    status: 'OPEN',
                    meeting: {
                        id: 2,
                        startDate: d2,
                        endDate: d2,
                        status: 'active',
                        professor: {
                            id: 0,
                            username: 'dummy',
                            roles: ['ROLE_PROF'],
                            title: 'Prof. Dr.',
                            firstname: 'Ralf',
                            lastname: 'Kramer',
                            studycourses: [
                                {
                                    id: 2,
                                    name: 'Datenbanksysteme'
                                }
                            ]
                        }
                    },
                    student: {
                        id: 0,
                        username: 'dummy',
                        roles: ['ROLE_STUDENT'],
                        firstname: 'dummy',
                        lastname: 'dummy'
                    }
                },
                {
                    id: 3,
                    name: 'Frage zur Übung 05',
                    duration: 20,
                    date: d3,
                    comment: 'Besprechen bzgl. 1 Abgabe',
                    status: 'ACCEPTED',
                    meeting: {
                        id: 3,
                        startDate: d3,
                        endDate: d3,
                        status: 'active',
                        professor: {
                            id: 0,
                            username: 'dummy',
                            roles: ['ROLE_PROF'],
                            title: 'Prof. Dr.',
                            firstname: 'Oliver',
                            lastname: 'Höß',
                            studycourses: [
                                {
                                    id: 3,
                                    name: 'Softwaremodellierung'
                                }
                            ]
                        }
                    },
                    student: {
                        id: 0,
                        username: 'dummy',
                        roles: ['ROLE_STUDENT'],
                        firstname: 'dummy',
                        lastname: 'dummy'
                    }
                }
            ]);

            this.store.dispatch({ type: 'SET_SLOTS', payload: slots });
        });
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
            }
            );
        this.printResponse('createSlot', response);
        response.subscribe((slots: Array<Slot>) => { // returns ALL slots, also the old/existing ones
            this.store.dispatch({ type: 'SET_SLOTS', payload: slots });
        });
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
            }
            );
        this.printResponse('updateSlot', response);
        // no response.subscribe() necessary
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
        }
        );
    };

    private serializeAsUrlParams(o: Object): string {
        let s = '';
        for (let key in o) {
            s += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(o[key]);
        }
        return s.slice(1);
    };

}
