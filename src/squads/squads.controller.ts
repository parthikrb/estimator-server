import { Controller, Get, Post, Res, Body, HttpStatus, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { SquadsService } from './squads.service';
import { Squad } from './interfaces/squads.interface';
import { SquadDto } from './dto/squadsDto';
import { Users } from '../users/users.decorator';

@Controller('squads')
export class SquadsController {
    constructor(private readonly squadsService: SquadsService) { }

    @Get()
    async getAllSquads(): Promise<Squad[]> {
        return await this.squadsService.getAllSquads();
    }

    @Post()
    // async addSquad(@Res() res, @Users('username') creator, @Body() data: SquadDto): Promise<Squad> {
    async addSquad(@Res() res, @Body() data: SquadDto): Promise<Squad> {
        const squad = await this.squadsService.createSquad('creator', data);
        return res.status(HttpStatus.OK).json(squad);
    }

    @Get(':id')
    async getSquad(@Res() res, @Param('id') id): Promise<Squad> {
        const squad = await this.squadsService.getSquad(id);
        if (!squad) throw new NotFoundException('Squad does not exists!');
        return res.status(HttpStatus.OK).json(squad);
    }

    @Put(':id')
    async updateSquad(@Res() res, @Users('username') updater, @Param('id') id, @Body() data): Promise<Squad> {
        const squad = await this.squadsService.updateSquad(id, updater, data);
        if (!squad) throw new NotFoundException('Squad does not exists!');
        return res.status(HttpStatus.OK).json(squad);
    }

    @Delete(':id')
    async deleteSquad(@Res() res, @Param('id') id) {
        const squad = await this.squadsService.deleteSquad(id);
        if (!squad) throw new NotFoundException('Squad does not exists!');
        const _squad = await this.squadsService.getAllSquads();
        return res.status(HttpStatus.OK).json(_squad);
    }
}
