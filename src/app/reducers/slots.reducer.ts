import { ActionReducer, Action } from '@ngrx/store';
import { Slot } from '../model/slot';
import * as _ from 'lodash';

let init: Array<Slot> = [];

let copy = function(slot: Slot): Slot {
    let copy = new Object();
    for (let key in slot) {
        copy[key] = slot[key];
    }
    return <Slot>copy;
}

export const slotsrx: ActionReducer<Array<Slot>> = (state: Array<Slot> = init, action: Action) => {
    switch (action.type) {
        case 'ADD_SLOTS':
            return [
                ...state,
                ...action.payload
            ];
        case 'SET_SLOT_PROFESSOR':
            let slot = copy(action.payload.slot);
            slot.professor = action.payload.professor;
            return [
                ..._.reject(state, {'id': slot.id}),
                slot
            ];
        case 'SET_SLOT_MEETING':
            slot = copy(action.payload.slot);
            slot.meeting = action.payload.meeting;
            return [
                ..._.reject(state, {'id': slot.id}),
                slot
            ];
        case 'SET_SLOT_STATUS':
            slot = copy(action.payload.slot);
            slot.status = action.payload.status;
            return [
                ..._.reject(state, {'id': slot.id}),
                slot
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
