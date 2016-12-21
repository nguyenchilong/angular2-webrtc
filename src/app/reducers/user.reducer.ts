import { ActionReducer, Action } from '@ngrx/store';

let init: any = {
    loggedin: false,
    name: '',
    role: ''
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
            return init;
        case 'SET_USERNAME':
            return Object.assign(
                {},
                state,
                { name: action.payload }
            );
        case 'SET_ROLE':
            switch (action.payload) {
                case 'ROLE_STUDENT':
                    return Object.assign(
                        {},
                        state,
                        { role: 'stud' }
                    );
                case 'ROLE_PROF':
                    return Object.assign(
                        {},
                        state,
                        { role: 'prof' }
                    );
                default:
                    return state;
            };
        case 'SET_USER':
            return Object.assign(
                {},
                state,
                action.payload
            );
        case 'SET_FIRSTNAME':
            return Object.assign(
                {},
                state,
                { firstname: action.payload}
            );
        case 'SET_LASTNAME':
            return Object.assign(
                {},
                state,
                { lastname: action.payload}
            );
        default:
            return state;
    }
};
