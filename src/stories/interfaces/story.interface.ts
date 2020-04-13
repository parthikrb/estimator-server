
import { Document } from 'mongoose';


export interface Story extends Document {
    readonly id?: string;
    readonly sprint: object;
    readonly storyname: string;
    readonly storyPoints: object;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}