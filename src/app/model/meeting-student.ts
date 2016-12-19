import { Meeting } from './meeting';
import { Professor } from './professor';

export class MeetingStudent extends Meeting {
    professor: Professor;
}