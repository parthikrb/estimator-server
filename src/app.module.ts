
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SquadsModule } from './squads/squads.module';
import { SprintsModule } from './sprints/sprints.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true, }), UsersModule, SquadsModule, SprintsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
