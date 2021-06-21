import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { EpisodeController } from './episode.controller';
import { EpisodeEntity } from './episode.entity';
import { EpisodeService } from './episode.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([EpisodeEntity]),
    SubscriptionModule,
  ],
  providers: [EpisodeService],
  controllers: [EpisodeController],
  exports: [EpisodeService],
})
export class EpisodeModule {}
