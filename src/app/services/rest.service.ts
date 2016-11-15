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
}
