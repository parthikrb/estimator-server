import { Module } from '@nestjs/common';
import { SquadsController } from './squads.controller';
import { SquadsService } from './squads.service';
import { squadsProviders } from './squads.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SquadsController],
  providers: [SquadsService, ...squadsProviders],
  exports: [SquadsService]
})
export class SquadsModule {}
