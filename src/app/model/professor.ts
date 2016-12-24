import { User } from './user';
import { StudyCourse } from './study-course';

export class Professor extends User {
    studycourses: Array<StudyCourse>;
}