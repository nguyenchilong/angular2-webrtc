import { ActionReducer, Action } from '@ngrx/store';
import { Slot } from '../model/slot';
import * as _ from 'lodash';

let init: Array<Slot> = [];

let copy = function(slots: Array<Slot>, slotId: number): Slot {
    let copy = new Object();
    for (let slot of slots) {
        if (slot.id === slotId) {
            for (let key in slot) {
                copy[key] = slot[key];
            }
            break;
        }
    }
    return <Slot>copy;
};
let replace = function(slots: Array<Slot>, slot: Slot): Array<Slot> {
    let result: Array<Slot> = new Array<Slot>();
    let i = 0;
    for (let s of slots) {
        if (s.id === slot.id) {
            result[i] = slot;
        } else {
            result[i] = s;
        }
        i++;
    }
    return result;
};
let union = function(slots1: Array<Slot>, slots2: Array<Slot>): Array<Slot> {
    let result: Array<Slot> = new Array<Slot>();
    let i = 0;
    for (let s1 of slots1) {
        result[i] = s1;
        i++;
    }
    for (let s2 of slots2) {
        let found = false;
        for (let s1 of slots1) {
            if (s1.id === s2.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            result[i] = s2;
            i++;
        }
    }
    return result;
};

export const slotsrx: ActionReducer<Array<Slot>> = (state: Array<Slot> = init, action: Action) => {
    switch (action.type) {
        case 'ADD_SLOTS':
            return union(
                state,
                action.payload
            );
        case 'ADD_SLOT':
            return union(
                state,
                [action.payload]
            );
        case 'UPDATE_SLOT_STATUS_COMMENT_DURATION':
            let slot = copy(state, action.payload.slotId); // copy from original slot in state-array to always work with the newest version of it
            slot.status = action.payload.status;
            slot.comment = action.payload.comment;
            slot.duration = action.payload.duration;
            return replace(state, slot);
        case 'REMOVE_SLOT':
            return [
                ..._.reject(state, { 'id': action.payload.id })
            ];
        case 'REPLACE_SLOT':
            return replace(state, action.payload);
            /*return [
                ..._.reject(state, { 'id': action.payload.id }),
                action.payload
            ];*/
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
