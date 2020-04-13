import { Document } from "mongoose";

export interface User extends Document {
    readonly id?: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly isAdmin: boolean;
    readonly createdAt: Date;
    readonly createdBy: string;
    readonly updatedAt: Date;
    readonly updatedBy: string;
}