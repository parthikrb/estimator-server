import { JwtStrategy } from './strategies/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { SquadsModule } from '../squads/squads.module';

@Module({
  imports: [
    SquadsModule,
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireTokenTime},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
  controllers: [AuthController],
  exports: [AuthService ]
})
export class AuthModule {}
