
import { Document } from 'mongoose';


export interface AuthUser extends Document {
    readonly id?: string;
    readonly username: string;
    readonly password: string;
    readonly token?: string;
}