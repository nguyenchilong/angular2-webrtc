import { User } from './user';
import { StudyCourse } from './study-course';

export class Student extends User {
    studycourses?: StudyCourse[];
}