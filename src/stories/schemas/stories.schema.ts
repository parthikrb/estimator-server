import * as mongoose from 'mongoose';


export const StorySchema = new mongoose.Schema({
    sprint: String,
    storyname: String,
    dev: Number,
    qa: Number,
    ba: Number,
    storyPoints: Object,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: String,
    updatedBy: String
}, {
    versionKey: false
});