import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { SquadDto } from './dto/squadsDto';
import { Squad } from './interfaces/squads.interface';

@Injectable()
export class SquadsService {
    constructor(
        @Inject('SQUAD_MODEL') private readonly squadModel: Model<Squad>
    ) { }

    async createSquad(creator: string, data: SquadDto): Promise<Squad> {
        const { squadname } = data;
        const _squad = await this.squadModel.findOne({ squadname });

        if (_squad) {
            throw new HttpException('Squad already exists ', HttpStatus.BAD_REQUEST);
        }
        const squad = new this.squadModel({ ...data, createdBy: creator, updatedBy: creator });
        return squad.save();
    }

    async getAllSquads(): Promise<Squad[]> {
        const squads = await this.squadModel.find().exec();
        return squads;
    }

    async getSquad(_id: string): Promise<Squad> {
        const squad = await this.squadModel.findById(_id).exec();
        return squad;
    }

    async getSquadByAccessCode(accessCode: string): Promise<Squad> {
        return await this.squadModel.findOne({ accessCode });
    }

    async updateSquad(_id: string, updater: string, data: SquadDto): Promise<Squad> {
        await this.squadModel.findByIdAndUpdate(_id, { ...data, updatedAt: Date.now(), updatedBy: updater }).exec();
        return await this.squadModel.findById(_id);
    }

    async deleteSquad(_id): Promise<any> {
        const deleteSquad = await this.squadModel.findByIdAndRemove(_id);
        return deleteSquad;
    }

}
