import { Meeting } from './meeting';
import { User } from './user';

export class Slot {
    id: number;
    name: string;
    duration: number;
    date: Date;
    comment: string;
    status: string; // 'OPEN', 'ACCEPTED', 'DECLINED' or 'CANCELED'
    meeting: Meeting;
    student: User;
}