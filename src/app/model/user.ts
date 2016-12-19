import { StudyCourse } from './study-course';

export class User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    password?: string;
    roles: Array<string>; // 'ROLE_PROF' or 'ROLE_STUDENT'
    studyCourses?: Array<StudyCourse>;
}