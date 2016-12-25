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
        case 'SET_USER_LOGIN':
            let role = { role: action.payload.role };
            if (action.payload.role === 'ROLE_STUDENT') {
                role.role = 'stud';
            } else if (action.payload.role === 'ROLE_PROF') {
                role.role = 'prof';
            } else {
                return state; // cancel
            }
            return Object.assign(
                {},
                state,
                action.payload,
                role
            );
        default:
            return state;
    }
};
