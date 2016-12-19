import { Meeting } from './meeting';
import { Slot } from './slot';

export class MeetingProfessor extends Meeting {
    slots: Array<Slot>;
}