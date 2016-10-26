import { Injectable } from '@angular/core';

@Injectable()

export class WampService {
    constructor() {

        let options: autobahn.IConnectionOptions = {
            url: 'wss://demo.crossbar.io/ws', realm: 'realm1'
        };

        let connection = new autobahn.Connection(options);
        connection.onopen = (session) => {
            console.log(session);
            session.subscribe('com.myapp.hello', () => { console.log('bla') });
        };
        connection.open();
    }
}
