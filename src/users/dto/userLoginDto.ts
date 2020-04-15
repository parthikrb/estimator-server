import { IsNotEmpty, IsString } from "class-validator";


export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    password: string;
    _id?: string;
    token?: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}