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
import * as moment from 'moment';

@Injectable()
export class RestService {

    private static readonly test: boolean = true;

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
        this.printRequestBody('createUser', user);
        this.printResponse('createUser', response);
        // no response.subscribe() necessary
        return response;
    }

    updateUserPassword(oldPassword: string, newPassword: string): Observable<User> {
        let userId = localStorage.getItem('user_id');
        /*
        let requestBody = this.serializeAsUrlParams({
            'app_password[currentPassword]': oldPassword,
            'app_password[newPassword][first]': newPassword,
            'app_password[newPassword][second]': newPassword
        });
        */
        let requestBody = 'app_password[currentPassword]=' + oldPassword +
                        '&app_password[newPassword][first]' + newPassword +
                        '&app_password[newPassword][second]' + newPassword;
        let response: Observable<User> = this.http.patch(REST + '/users/' + userId + '/change-password', requestBody, { withCredentials: true })
            .map((res: Response) => res.json() as User)
            .catch((err: any) => {
                return Observable.throw(err.json());
            }
        );
        this.printRequestBody('updateUserPassword', requestBody);
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
        response.subscribe((res) => {
            for (let meeting of res) {
                for (let slot of meeting.slots) {
                    slot.professor = meeting.professor;
                }
                if (meeting.slots) {
                    this.store.dispatch({ type: 'SET_SLOTS', payload: meeting.slots });
                }
            }
        });
        return response;
    }

    createMeeting(meeting: MeetingProfessor): Observable<void> {
        let userId = localStorage.getItem('user_id');
        let requestBody = this.serializeAsUrlParams(meeting);
        let response: Observable<void> = this.http.post(REST + '/users/' + userId + '/meetings', requestBody, { withCredentials: true })
            .catch((err: any) => {
                return Observable.throw(err.json());
            }
        );
        this.printRequestBody('createMeeting', requestBody);
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
        this.printRequestBody('updateMeeting', requestBody);
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
        this.printRequestBody('createSlot', requestBody);
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
        this.printRequestBody('updateSlot', requestBody);
        this.printResponse('updateSlot', response);
        // no response.subscribe() necessary
        return response;
    }

    private printRequestBody(functionName: string, requestBody: any) {
        if (RestService.test) {
            console.log(functionName + '() <= ' + JSON.stringify(requestBody, null, 2));
        }
    };

    private printResponse(functionName: string, response: Observable<any>) {
        if (RestService.test) {
            response.subscribe(
                data => {
                    console.log(functionName + '() => ' + JSON.stringify(data, null, 2));
                },
                err => {
                    if (typeof err === typeof Error) {
                        console.log(functionName + '() error => ' + JSON.stringify(err, null, 2));
                    } else {
                        console.log(functionName + '() unknown error => ' + JSON.stringify(err, null, 2));
                    }
                }
            );
        }
    };

    private serializeAsUrlParams(o: Object): string {
        let s = '';
        for (let key in o) {
            //s += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(o[key]);
            s += '&' + key + '=' + encodeURIComponent(o[key]); // don't escape key because the server needs it that way
        }
        return s.slice(1);
    };

    public transformDate(value: string): string {
        return moment(value).locale('de').format('DD.MM.Y HH:mm');
    }

}
