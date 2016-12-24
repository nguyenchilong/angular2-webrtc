import { ActionReducer, Action } from '@ngrx/store';
import { Slot } from '../model/slot';
import * as _ from 'lodash';

let init: Array<Slot> = [];

export const slotsrx: ActionReducer<Array<Slot>> = (state: Array<Slot> = init, action: Action) => {
    switch (action.type) {
        case 'ADD_SLOTS':
            return [
                ...state,
                ...action.payload
            ];
        case 'ADD_SLOT':
            return [
                ...state,
                action.payload
            ];
        case 'REMOVE_SLOT':
            return [
                ..._.reject(state, { 'id': action.payload.id })
            ];
        case 'REPLACE_SLOT':
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
