import { Document } from 'mongoose';
import { Squad } from 'src/squads/interfaces/squads.interface';

export interface Sprint extends Document {
    readonly id?: string;
    readonly squad: object;
    readonly sprintname: string;
    readonly devCapacity: number;
    readonly qaCapacity: number;
    readonly poCapacity: number;
    readonly baCapacity: number;
    readonly createdAt?: Date;
    readonly updatedAt?: any;
    readonly createdBy?: string;
    readonly updatedBy?: string;
}