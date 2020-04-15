
import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SquadsModule } from './squads/squads.module';
import { SprintsModule } from './sprints/sprints.module';
import { StoriesModule } from './stories/stories.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters/http-error.filter';

@Module({
  imports: [DatabaseModule, CacheModule.register(), ConfigModule.forRoot({ isGlobal: true, }), UsersModule, SquadsModule, SprintsModule, StoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    }],
})
export class AppModule { }
