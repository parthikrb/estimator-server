import { Squad } from './../../squads/interfaces/squads.interface';

export class SprintDto {
    readonly _id?: string;
    readonly squad: Squad;
    readonly sprintname: string;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}