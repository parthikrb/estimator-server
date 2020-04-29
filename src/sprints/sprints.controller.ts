import { Controller, Get, Post, Res, Body, HttpStatus, Param, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { Sprint } from './interfaces/sprint.interface';
import { SprintDto } from './dto/sprintDto';
import { Users } from 'src/users/users.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('')
export class SprintsController {
    constructor(private readonly sprintsService: SprintsService) { }

    @Get('sprints')
    async getAllSprints(): Promise<Sprint[]> {
        return await this.sprintsService.getAllSprints();
    }

    @Post('sprint')
    async addSprint(@Res() res, @Users('username') creator, @Body() data: SprintDto): Promise<Sprint> {
        await this.sprintsService.createSprint(creator, data);
        return res.status(HttpStatus.OK);
    }

    @Get('sprints/:id')
    async getSprint(@Res() res, @Param('id') id): Promise<Sprint> {
        const sprint = await this.sprintsService.getSprint(id);
        if (!sprint) throw new NotFoundException('Sprint does not exists!');
        return sprint;
    }

    @Put('sprints/:id')
    async updateSprint(@Res() res, @Users('username') updater, @Param('id') id, @Body() data): Promise<Sprint> {
        const sprint = await this.sprintsService.updateSprint(id, updater, data);
        if (!sprint) throw new NotFoundException('Sprint does not exists!');
        return res.status(HttpStatus.OK).json(sprint);
    }

    @Delete('sprints/:id')
    async deleteSprint(@Res() res, @Param('id') id) {
        const sprint = await this.sprintsService.deleteSprint(id);
        if (!sprint) throw new NotFoundException('Sprint does not exists!');
        const _sprint = await this.sprintsService.getAllSprints();
        return res.status(HttpStatus.OK).json(_sprint);
    }
}
