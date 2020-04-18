import { Document } from 'mongoose';

export interface Squad extends Document {
    readonly id?: string;
    readonly squadname: string;
    readonly posm: string;
    readonly accessCode?: string;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}
