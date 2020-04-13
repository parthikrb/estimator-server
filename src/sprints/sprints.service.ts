import { Injectable, Inject } from '@nestjs/common';
import { Sprint } from './interfaces/sprint.interface';
import { Model } from 'mongoose';
import { SprintDto } from './dto/sprintDto';

@Injectable()
export class SprintsService {
    constructor(
        @Inject('SPRINT_MODEL') private readonly sprintModel: Model<Sprint>
    ) { }

    async createSprint(creator: string, data: SprintDto): Promise<Sprint> {
        const sprint = new this.sprintModel({ ...data, createdBy: creator, updatedBy: creator });
        return sprint.save();
    }

    async getAllSprints(): Promise<Sprint[]> {
        const sprints = await this.sprintModel.find().exec();
        return sprints;
    }

    async getSprint(_id: string): Promise<Sprint> {
        const sprint = await this.sprintModel.findById(_id).exec();
        return sprint;
    }

    async updateSprint(_id: string, updater: string, data: SprintDto): Promise<Sprint> {
        await this.sprintModel.findByIdAndUpdate(_id, { ...data, updatedAt: Date.now(), updatedBy: updater }).exec();
        return await this.sprintModel.findById(_id);
    }

    async deleteSprint(_id): Promise<any> {
        const deleteSprint = await this.sprintModel.findByIdAndRemove(_id);
        return deleteSprint;
    }

}
