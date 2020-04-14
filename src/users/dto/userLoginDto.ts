

export class UserLoginDto {
    username: string;
    password: string;
    _id?: string;
    token?: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}