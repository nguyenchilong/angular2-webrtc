import { Injectable } from '@angular/core';

@Injectable()

export class WampService {
    constructor() {

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
