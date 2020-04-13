import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserDto } from './dto/userDto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL') private readonly userModel: Model<User>
    ) { }

    async createUser(creator: string, data: UserDto): Promise<User> {
        const { username, password } = data;

        const _user = await this.userModel.findOne({ username });

        if (_user) {
            throw new HttpException('User already exists ', HttpStatus.BAD_REQUEST);
        }

        const _password = await bcrypt.hash(password, 10);
        const user = new this.userModel({ ...data, password: _password, createdBy: creator, updatedBy: creator });
        return user.save();
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(_id: string): Promise<User> {
        const user = await this.userModel.findById(_id).exec();
        return user;
    }

    async updateUser(_id: string, updater: string, data: UserDto): Promise<User> {
        const { password } = data;
        const _password = await bcrypt.hash(password, 10);
        await this.userModel.findByIdAndUpdate(_id, { ...data, password: _password, updatedAt: Date.now(), updatedBy: updater }).exec();
        return await this.userModel.findById(_id);
    }

    async deleteUser(_id): Promise<any> {
        const deleteUser = await this.userModel.findByIdAndRemove(_id);
        return deleteUser;
    }

}
