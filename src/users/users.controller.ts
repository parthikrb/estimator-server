import { Controller, Get, Post, Body, Res, HttpStatus, Param, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { Users } from './users.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Post()
    async addUser(@Res() res, @Users('username') creator, @Body() data: UserDto): Promise<User> {
    // async addUser(@Res() res, @Body() data: UserDto): Promise<User> {
        const user = await this.usersService.createUser(creator, data);
        return res.status(HttpStatus.OK).json(user);
    }

    @Get(':id')
    async getUser(@Res() res, @Param('id') id): Promise<User> {
        const user = await this.usersService.getUser(id);
        if (!user) throw new NotFoundException('User does not exists!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Put(':id')
    async updateUser(@Res() res, @Users('username') updater, @Param('id') id, @Body() data): Promise<User> {
        const user = await this.usersService.updateUser(id, updater, data);
        if (!user) throw new NotFoundException('User does not exists!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete(':id')
    async deleteUser(@Res() res, @Param('id') id) {
        const user = await this.usersService.deleteUser(id);
        if (!user) throw new NotFoundException('User does not exists!');
        const _user = await this.usersService.getAllUsers();
        return res.status(HttpStatus.OK).json(_user);
    }


}
