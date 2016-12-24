import { MeetingStudent } from './meeting-student';
import { Student } from './student';

export class Slot {
    id?: number; // not set while the object is not created yet (server creates a new id)
    name: string;
    duration: number;
    date: Date;
    comment: string;
    status: string; // 'OPEN', 'ACCEPTED', 'DECLINED' or 'CANCELED'
    meeting: MeetingStudent;
    student: Student;
}

interface meeting { // old
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: Color;
    prof: string;
    vorlesung: string;
    time: string;
}
interface Color {
    primary: string;
    secondary: string;
}
