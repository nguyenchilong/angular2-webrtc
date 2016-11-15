import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()

export class RestService {

    constructor(private http: Http) {

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
