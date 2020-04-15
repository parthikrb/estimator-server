import { IsNotEmpty, IsString, IsBooleanString, IsDateString } from "class-validator";

export class UserDto {
    readonly _id?: string;
    @IsNotEmpty() @IsString() readonly firstname: string;
    @IsNotEmpty() @IsString()readonly lastname: string;
    @IsNotEmpty() @IsString() readonly username: string;
    @IsNotEmpty() @IsString() readonly password: string;
    @IsNotEmpty() @IsString() readonly email: string;
    @IsNotEmpty() @IsBooleanString() readonly isAdmin: boolean;
    @IsDateString() readonly created_at?: Date;
    @IsDateString() readonly updated_at?: Date;
    @IsDateString() readonly created_by?: string;
    @IsDateString() readonly updated_by?: string;
}