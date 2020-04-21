import { Document } from "mongoose";

export interface User extends Document {
    readonly id?: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly isAdmin: boolean;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: any;
    updatedBy?: string;
}