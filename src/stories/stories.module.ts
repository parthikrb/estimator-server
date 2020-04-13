import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { storiesProviders } from './stories.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StoriesController],
  providers: [StoriesService, ...storiesProviders],
  exports: [StoriesService]
})
export class StoriesModule {}
