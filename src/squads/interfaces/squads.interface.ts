import { Document } from 'mongoose';

export interface Squad extends Document {
    readonly id?: string;
    readonly squadname: string;
    readonly posm: object[];
    readonly accessCode?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: any;
    readonly createdBy?: string;
    readonly updatedBy?: string;
}
