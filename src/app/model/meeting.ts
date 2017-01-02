import { Slot } from './slot';
import { Professor } from './professor';

export class Meeting {
    id?: number; // not set while the object is not created yet (server creates a new id)
    startDate: string;
    endDate: string;
    slots?: Slot[];
    professor: Professor;
    status: string; // 'active' or 'canceled'
}
