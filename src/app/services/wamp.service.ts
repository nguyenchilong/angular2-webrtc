import { Injectable } from '@angular/core';

@Injectable()

export class WampService {
    constructor() {
        /*
        let options: autobahn.IConnectionOptions = {
            url: 'ws://10.90.79.146:8084/'
        };

        let connection = new autobahn.Connection(options);
        connection.onopen = (session) => {
            console.log(session);
            session.subscribe('signaling/', () => { console.log('bla') });
        };
        connection.open();
        */

        let conn = new ab.Session('wss://192.168.43.109',
        // onsuc:
        function() {
            conn.subscribe('signaling/', function(topic, data) {
                console.log(data);
            });
        },
        // on err
        function() {
        },
        {'skipSubprotocolCheck': true}

    );

    }
}
