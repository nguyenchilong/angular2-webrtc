import { User } from './user';
import { StudyCourse } from './study-course';
import { Meeting } from './meeting';

export class Professor extends User {
    studycourses: Array<StudyCourse>;
    meetings?: Array<Meeting>;
}