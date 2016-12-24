import { ActionReducer, Action } from '@ngrx/store';
import { UserLogin } from '../model/user-login';

let init: UserLogin = {
    loggedin: false,
    username: '',
    role: ''
};

export const userrx: ActionReducer<UserLogin> = (state: UserLogin = init, action: Action) => {
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
                { username: action.payload }
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
