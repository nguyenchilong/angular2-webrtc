import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()

export class RestService {

    constructor(private http: Http) {

    }

    callApi(): Observable<any> {
        return this.http.get('http://echo.jsontest.com/id/1/name/Max/nachname/Mustermann');
    }

    getMeetings(): any {
        return [
            {
                prof: 'Prof. Dr. Otto Offline',
                vorlesung: 'Mathe 1/2',
                time: 'Mo 15:30 13.12.16'
            },
            {
                prof: 'Prof. Dr. Ralf Kramer',
                vorlesung: 'Datenbanksysteme',
                time: 'Do 12:30 20.12.16'
            },
            {
                prof: 'Prof. Dr. Oliver Höß',
                vorlesung: 'Softwaremodellierung',
                time: 'Fr 13:30 01.12.16'
            }
        ];
    }
}
