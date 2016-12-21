export class User {
    id: number;
    username: string;
    password?: string;
    roles: Array<string>; // 'ROLE_PROF' or 'ROLE_STUDENT'
    firstname: string;
    lastname: string;
}