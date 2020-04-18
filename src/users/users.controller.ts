import { Controller, Get, Post, Body, Res, HttpStatus, Param, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { Users } from './users.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('users')
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Post('user')
    async addUser(@Res() res, @Users('username') creator: string, @Body() data: UserDto): Promise<User> {
        await this.usersService.createUser(creator, data);
        return res.status(HttpStatus.OK);
    }

    @Get('users/:id')
    async getUser(@Res() res, @Param('id') id: string): Promise<User> {
        const user = await this.usersService.getUser(id);
        if (!user) throw new NotFoundException('User does not exists!');
        return user;
    }

    @Put('users/:id')
    async updateUser(@Res() res, @Users('username') updater: string, @Param('id') id: string, @Body() data): Promise<User> {
        const user = await this.usersService.updateUser(id, updater, data);
        if (!user) throw new NotFoundException('User does not exists!');
        return res.status(HttpStatus.OK);
    }

    @Delete('users/:id')
    async deleteUser(@Res() res, @Param('id') id: string) {
        const user = await this.usersService.deleteUser(id);
        if (!user) throw new NotFoundException('User does not exists!');
        // const _user = await this.usersService.getAllUsers();
        return res.status(HttpStatus.OK);
    }


}
