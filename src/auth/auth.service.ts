import { jwtConstants } from './constants';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './../users/interfaces/authUser.interface';
import { UserLoginDto } from 'src/users/dto/userLoginDto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService) {
  }

  public async validateUser(user: UserLoginDto): Promise<UserLoginDto> {
    try {
      const existedUser: UserLoginDto = await this.usersService.findOneByUsername(user.username);
      Logger.log('User '+ JSON.stringify(user));
      if (existedUser && await bcrypt.compare(user.password, existedUser.password)) {
        return existedUser || null;
      }
    } catch (err) {
      return null;
    }
  }

  public async login(user: AuthUser): Promise<AccessToken> {
    const payload = { username: user.username, sub: user._id };
    return {
      expireTime: jwtConstants.expireTokenTime,
      value: this.jwtService.sign(payload),
    };
  }



}

export interface AccessToken {
  expireTime: string;
  value: string;
}
