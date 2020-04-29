
import { Document } from 'mongoose';


export interface Story extends Document {
    readonly id?: string;
    readonly sprint: string;
    readonly storyname: string;
    readonly dev: number;
    readonly qa: number;
    readonly ba: number;
    readonly storyPoints: object;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}