export class User {
    id?: number; // not set while the object is not created yet (server creates a new id)
    username: string; // email
    password?: string; // only set just before creating a new user
    roles: Array<string>; // 'ROLE_PROF' or 'ROLE_STUDENT'
    title?: string;
    firstname: string;
    lastname: string;
}