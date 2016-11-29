import { Injectable } from '@angular/core';
import { WAMP } from './constants';

@Injectable()

export class WampService {
    constructor() {

        let conn = new ab.Session(
        // URL of socket
        WAMP,
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
