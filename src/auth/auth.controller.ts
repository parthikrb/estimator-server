import { Controller, Post, HttpCode, HttpStatus, Body, ValidationPipe, HttpException, UseGuards } from '@nestjs/common';
import { AuthService, AccessToken } from './auth.service';
import { User } from 'src/users/interfaces/user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Body(new ValidationPipe()) user: User): Promise<AccessToken> {
        try {
            console.log('Inside')
            return await this.authService.login(user);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException('Server error', HttpStatus.FORBIDDEN);
            }
        }
    }

}
