import { ActionReducer, Action } from '@ngrx/store';
import { meeting } from '../app.interfaces';

let init: meeting[] = [];

export const meetingsrx: ActionReducer<meeting[]> = (state: meeting[] = init, action: Action) => {
    switch (action.type) {

        case 'ADD_MEETINGS':
            return action.payload;
            /*
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
            */
        default:
            return state;
    }
};
