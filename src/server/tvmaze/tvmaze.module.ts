import { Module } from '@nestjs/common';

import { EpisodeModule } from '../episode/episode.module';
import { LoggerModule } from '../logger/logger.module';
import { ShowModule } from '../show/show.module';
import { TvMazeService } from './tvmaze.service';

@Module({
  imports: [LoggerModule, ShowModule, EpisodeModule],
  providers: [TvMazeService],
})
export class TvMazeModule {}
