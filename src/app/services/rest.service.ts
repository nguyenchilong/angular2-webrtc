import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()

export class RestService {

    d1 = new Date();
    d2 = new Date();
    d3 = new Date();

    constructor(private http: Http) {
        this.d1.setDate(new Date().getDate() + 1);
        this.d2.setDate(new Date().getDate() + 3);
        this.d3.setDate(new Date().getDate() + 7);
    }

    callApi(): Observable<any> {
        let values: string = 'Basic ' + btoa('test:Test1234');
        let headers = new Headers();
        // vll hinzufügen vll nicht: headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', values);
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });
        return this.http.post('https://httpbin.org/post', null, options);
    }

    getMeetings(): any {
        return [
            {
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

/*
    callApi(): Observable<any> {
        var obj = { UserName: 'test', Password: 'Test1234' };

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });

        let body = this.serializeObj(obj);

        return this.http.post('http://10.90.38.128:8080/webrtc/web/app_test.php/tokens', body, options);
    }

    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }
    */
}
