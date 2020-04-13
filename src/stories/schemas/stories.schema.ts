import * as mongoose from 'mongoose';
import { SprintSchema } from '../../sprints/schemas/sprints.schema';


export const StorySchema = new mongoose.Schema({
    sprint: SprintSchema,
    storyname: String,
    storyPoints: Array,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: String,
    updatedBy: String
}, {
    versionKey: false
});