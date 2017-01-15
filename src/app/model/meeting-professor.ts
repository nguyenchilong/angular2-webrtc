import { Meeting } from './meeting';
import { Slot } from './slot';
import { Professor } from './professor';

export class MeetingProfessor extends Meeting {
    professor?: Professor;
    slots: Array<Slot>;
}