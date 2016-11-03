import { ActionReducer, Action } from '@ngrx/store';

let init: any = {
    loggedin: false,
    name: 'Max Mustermann'
};

export const userrx: ActionReducer<any> = (state: any = init, action: Action) => {
    switch (action.type) {

        case 'LOGIN_USER':
            return Object.assign(
                {},
                state,
                { loggedin: true }
            );
        case 'LOGOUT_USER':
            return Object.assign(
                {},
                state,
                { loggedin: false }
            );
        case 'SET_NAME':
            return Object.assign(
                {},
                state,
                { name: action.payload}
            );
        default:
            return state;
    }
};
