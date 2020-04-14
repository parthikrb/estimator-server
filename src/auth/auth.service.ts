import { jwtConstants } from './constants';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './../users/interfaces/authUser.interface';
import { UserLoginDto } from 'src/users/dto/userLoginDto';
@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService) {
  }

  public async validateUser(user: UserLoginDto): Promise<UserLoginDto> {
    try {
      const existedUser: UserLoginDto = await this.usersService.findOneByUsernameAndPassword(user);
      return existedUser || null;
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
