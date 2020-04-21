import { IsObject, IsNotEmpty, IsString, IsNumber } from "class-validator";


export class SprintDto {
    readonly _id?: string;
    @IsObject() @IsNotEmpty() readonly squad: object;
    @IsString() @IsNotEmpty() readonly sprintname: string;
    @IsNumber() readonly devCapacity: number;
    @IsNumber() readonly qaCapacity: number;
    @IsNumber() readonly poCapacity: number;
    @IsNumber() readonly baCapacity: number;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}