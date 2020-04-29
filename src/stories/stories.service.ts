import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Story } from './interfaces/story.interface';
import { StoryDto } from './dto/StoryDto';

@Injectable()
export class StoriesService {

    constructor(
        @Inject('STORY_MODEL') private readonly storyModel: Model<Story>
    ) { }

    async createStory(creator: string, data: StoryDto): Promise<Story> {
        const story = new this.storyModel({ ...data, createdBy: creator, updatedBy: creator });
        return story.save();
    }

    async getAllStories(): Promise<Story[]> {
        const stories = await this.storyModel.find().exec();
        return stories;
    }

    async getStory(_id: string): Promise<Story> {
        const story = await this.storyModel.findById(_id).exec();
        return story;
    }

    async getStoryBySprintName(sprint: string) : Promise<Story[]> {
        return await this.storyModel.find({sprint}).exec();
    }

    async updateStory(_id: string, updater: string, data: StoryDto): Promise<Story> {
        await this.storyModel.findByIdAndUpdate(_id, { ...data, updatedAt: Date.now(), updatedBy: updater }).exec();
        return await this.storyModel.findById(_id);
    }

    async deleteStory(_id): Promise<any> {
        const deleteStory = await this.storyModel.findByIdAndRemove(_id);
        return deleteStory;
    }
}
