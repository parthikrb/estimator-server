import * as mongoose from 'mongoose';


export const StorySchema = new mongoose.Schema({
    sprint: String,
    storyname: String,
    dev: { type: Number, default: 0},
    qa: { type: Number, default: 0},
    ba: { type: Number, default: 0},
    storyPoints: Object,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: String,
    updatedBy: String
}, {
    versionKey: false
});