import * as mongoose from 'mongoose';

export const SquadSchema = new mongoose.Schema({
    squadname: String,
    accessCode: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default:Date.now},
    createdBy: String,
    updatedBy: String
}, {
    versionKey: false
})