import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean } from "class-validator";

export class UserDto {
    readonly _id?: string;
    @IsNotEmpty() @IsString() readonly firstname: string;
    @IsNotEmpty() @IsString()readonly lastname: string;
    @IsNotEmpty() @IsString() readonly username: string;
    @IsNotEmpty() @IsString() readonly password: string;
    @IsNotEmpty() @IsString() readonly email: string;
    @IsNotEmpty() @IsBoolean() readonly isAdmin: boolean;
    @IsDateString() @IsOptional() readonly created_at?: Date;
    @IsDateString() @IsOptional() readonly updated_at?: Date;
    @IsDateString() @IsOptional() readonly created_by?: string;
    @IsDateString() @IsOptional() readonly updated_by?: string;
}