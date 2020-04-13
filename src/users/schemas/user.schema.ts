import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    isAdmin: Boolean,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default:Date.now},
    createdBy: String,
    updatedBy: String
}, {
    versionKey: false
})