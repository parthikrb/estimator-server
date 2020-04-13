import { Module } from '@nestjs/common';
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';
import { sprintsProviders } from './sprints.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SprintsController],
  providers: [SprintsService, ...sprintsProviders],
  exports: [SprintsService]
})
export class SprintsModule { }
