import { ActionReducer, Action } from '@ngrx/store';
import { Professor } from '../model/professor';
import * as _ from 'lodash';

let init: Array<Professor> = [];

let copy = function(prof: Professor): Professor {
    let copy = new Object();
    for (let key in prof) {
        copy[key] = prof[key];
    }
    return <Professor>copy;
}

export const professorsrx: ActionReducer<Array<Professor>> = (state: Array<Professor> = init, action: Action) => {
    switch (action.type) {
        case 'SET_PROFESSORS':
            return [
                ...action.payload
            ];
        case 'SET_PROFESSOR_MEETINGS':
            let prof = copy(action.payload.professor);
            prof.meetings = action.payload.meetings;
            return [
                ..._.reject(state, {'id': prof.id}),
                prof
            ];
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
