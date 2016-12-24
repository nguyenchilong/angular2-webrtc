import { ActionReducer, Action } from '@ngrx/store';
import { Professor } from '../model/professor';

let init: Array<Professor> = [];

export const professorsrx: ActionReducer<Array<Professor>> = (state: Array<Professor> = init, action: Action) => {
    switch (action.type) {
        case 'ADD_PROFESSORS':
            return [
                ...action.payload
            ];
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
