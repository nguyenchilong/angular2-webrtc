import { ActionReducer, Action } from '@ngrx/store';
import { Professor } from '../model/professor';

let init: Array<Professor> = [];

let copy = function(professors: Array<Professor>, professorId: number): Professor {
    let copy = new Object();
    for (let professor of professors) {
        if (professor.id === professorId) {
            for (let key in professor) {
                copy[key] = professor[key];
            }
            break;
        }
    }
    return <Professor>copy;
};
let replace = function(profs: Array<Professor>, prof: Professor): Array<Professor> {
    let result: Array<Professor> = new Array<Professor>();
    let i = 0;
    for (let p of profs) {
        if (p.id === prof.id) {
            result[i] = prof;
        } else {
            result[i] = p;
        }
        i++;
    }
    return result;
};

export const professorsrx: ActionReducer<Array<Professor>> = (state: Array<Professor> = init, action: Action) => {
    switch (action.type) {
        case 'SET_PROFESSORS':
            return [
                ...action.payload
            ];
        case 'SET_PROFESSOR_MEETINGS':
            let prof = copy(state, action.payload.professorId);
            prof.meetings = action.payload.meetings;
            return replace(state, prof);
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
