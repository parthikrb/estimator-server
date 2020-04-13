export class UserDto {
    readonly _id?: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly isAdmin: boolean;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}