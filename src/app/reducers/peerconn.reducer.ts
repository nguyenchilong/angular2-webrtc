import { ActionReducer, Action } from '@ngrx/store';

let init: any = {
    connectionexists: false,
    callactive: false
};

export const peerconnrx: ActionReducer<any> = (state: any = init, action: Action) => {
    switch (action.type) {

        case 'CONNECTION_CREATED':
            return Object.assign(
                {},
                state,
                { connectionexists: true }
            );
        case 'CONNECTION_CLOSED':
            return Object.assign(
                {},
                state,
                { connectionexists: false }
            );
        case 'CALL_STARTED':
            return Object.assign(
                {},
                state,
                { callactive: true }
            );
        case 'CALL_ENDED':
            return Object.assign(
                {},
                state,
                { callactive: false }
            );
        default:
            return state;
    }
};