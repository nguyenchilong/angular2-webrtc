import { ActionReducer, Action } from '@ngrx/store';

let init: any[] = [];

export const personsrx: ActionReducer<any> = (state: any = init, action: Action) => {
    switch (action.type) {
        case 'ADD_PERSONS':
            return [
                ...action.payload
            ];
        case 'CLEAR':
            return init;
        default:
            return state;
    }
};
