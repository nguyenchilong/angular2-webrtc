import { Meeting } from './meeting';
import { Student } from './student';

export class Slot {
    id?: number; // not set while the object is not created yet (server creates a new id)
    name: string;
    duration: number;
    date?: Date; // not set while the object is not created yet (server selects the right begin-datetime)
    comment: string;
    status: string; // 'OPEN', 'ACCEPTED', 'DECLINED' or 'CANCELED'
    meeting: Meeting;
    student: Student;
}
