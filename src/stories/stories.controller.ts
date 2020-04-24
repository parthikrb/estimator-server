import { Controller, Get, Post, Res, Body, HttpStatus, Param, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { Story } from './interfaces/story.interface';
import { StoryDto } from './dto/StoryDto';
import { Users } from 'src/users/users.decorator';
import { StoriesService } from './stories.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('')
export class StoriesController {

    constructor(private readonly storiesService: StoriesService) { }

    @Get('stories')
    async getAllStories(): Promise<Story[]> {
        return await this.storiesService.getAllStories();
    }

    @Post('story')
    async addStory(@Res() res, @Users('username') creator, @Body() data: StoryDto): Promise<Story> {
        // async addStory(@Res() res, @Body() data: StoryDto): Promise<Story> {
        const story = await this.storiesService.createStory(creator, data);
        return res.status(HttpStatus.OK).json(story);
    }

    @Get('story/:id')
    async getStory(@Res() res, @Param('id') accessCode): Promise<Story> {
        const story = await this.storiesService.getStoryByAccessCode(accessCode);
        if (!story) throw new NotFoundException('Story does not exists!');
        return res.status(HttpStatus.OK).json(story);
    }

    @Put('story/:id')
    async updateStory(@Res() res, @Users('username') updater, @Param('id') id, @Body() data): Promise<Story> {
        const story = await this.storiesService.updateStory(id, updater, data);
        if (!story) throw new NotFoundException('Story does not exists!');
        return res.status(HttpStatus.OK).json(story);
    }

    @Delete('story/:id')
    async deleteStory(@Res() res, @Param('id') id) {
        const story = await this.storiesService.deleteStory(id);
        if (!story) throw new NotFoundException('Story does not exists!');
        const _story = await this.storiesService.getAllStories();
        return res.status(HttpStatus.OK).json(_story);
    }
}
