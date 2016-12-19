import { MeetingStudent } from './meeting-student';
import { Student } from './student';

export class Slot {
    id: number;
    name: string;
    duration: number;
    date: Date;
    comment: string;
    status: string; // 'OPEN', 'ACCEPTED', 'DECLINED' or 'CANCELED'
    meeting: MeetingStudent;
    student: Student;
}