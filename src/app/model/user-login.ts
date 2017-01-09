import { User } from './user';

export class UserLogin {
    loggedin: boolean;
    role: string; // 'prof' or 'stud'
    username: string;
    firstname?: string;
    lastname?: string;
    user?: User;
}