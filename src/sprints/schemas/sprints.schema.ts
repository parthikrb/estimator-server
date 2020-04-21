import * as mongoose from 'mongoose';
import { SquadSchema } from '../../squads/schemas/squad.schema';

export const SprintSchema = new mongoose.Schema({
    squad: SquadSchema,
    sprintname: String,
    devCapacity: Number,
    qaCapacity: Number,
    baCapacity: Number,
    poCapacity: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: String,
    updatedBy: String
}, {
    versionKey: false
});