export class User {
    id?: number; // not set while the object is not created yet (server creates a new id)
    username: string;
    password?: string;
    roles: Array<string>; // 'ROLE_PROF' or 'ROLE_STUDENT'
    firstname: string;
    lastname: string;
}