import { Controller, Get, Post, Res, Body, HttpStatus, Param, NotFoundException, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { Story } from './interfaces/story.interface';
import { StoryDto } from './dto/StoryDto';
import { Users } from 'src/users/users.decorator';
import { StoriesService } from './stories.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('')
export class StoriesController {

    constructor(private readonly storiesService: StoriesService) { }
    
    @Get('stories?sprintname=:sprint')
    async getStory(@Res() res, @Query('sprint') sprintname): Promise<Story[]> {
        console.log('Check');
        const story = await this.storiesService.getStoryBySprintName(sprintname);
        if (!story) throw new NotFoundException('Story does not exists!');
        return res.status(HttpStatus.OK).json(story);
    }

    @Get('stories')
    async getAllStories(): Promise<Story[]> {
        console.log('Ch');
        return await this.storiesService.getAllStories();
    }

    @Post('story')
    async addStory(@Res() res, @Users('username') creator, @Body() data: StoryDto): Promise<Story> {
        // async addStory(@Res() res, @Body() data: StoryDto): Promise<Story> {
        await this.storiesService.createStory(creator, data);
        return res.status(HttpStatus.OK);
    }

    @Put('story/:id')
    async updateStory(@Res() res, @Users('username') updater, @Param('id') id, @Body() data): Promise<Story> {
        const story = await this.storiesService.updateStory(id, updater, data);
        if (!story) throw new NotFoundException('Story does not exists!');
        return res.status(HttpStatus.OK);
    }

    @Delete('story/:id')
    async deleteStory(@Res() res, @Param('id') id) {
        const story = await this.storiesService.deleteStory(id);
        if (!story) throw new NotFoundException('Story does not exists!');
        return res.status(HttpStatus.OK);
    }
}
