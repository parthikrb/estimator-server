import { Document } from 'mongoose';
import { Squad } from 'src/squads/interfaces/squads.interface';

export interface Sprint extends Document {
    readonly id?: string;
    readonly squad: Squad;
    readonly sprintname: string;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}