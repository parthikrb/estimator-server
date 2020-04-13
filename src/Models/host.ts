export class Host {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    _id?: string;

    constructor(firstname: string, lastname: string, username: string, password: string, email: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}