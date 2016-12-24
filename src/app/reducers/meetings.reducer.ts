import { ActionReducer, Action } from '@ngrx/store';
import { meeting } from '../app.interfaces';
import * as _ from 'lodash';

let init: meeting[] = [];

export const meetingsrx: ActionReducer<meeting[]> = (state: meeting[] = init, action: Action) => {
    switch (action.type) {
        case 'ADD_MEETINGS':
            return [
                ...state,
                ...action.payload
            ];
        case 'ADD_MEETING':
            return [
                ...state,
                action.payload
            ];
        case 'REMOVE_MEETING':
            return [
                ..._.reject(state, { 'id': action.payload.id })
            ];
        case 'REPLACE_MEETING':
            return [
                ..._.reject(state, { 'id': action.payload.id }),
                action.payload
            ];
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
