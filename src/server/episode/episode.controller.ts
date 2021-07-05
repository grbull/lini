import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserEntity } from '../user/user.entity';
import { EpisodeEntity } from './episode.entity';
import { EpisodeService } from './episode.service';

@Controller('episode')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get('schedule')
  public async schedule(
    @User() user: UserEntity
  ): Promise<{ future: EpisodeEntity[]; past: EpisodeEntity[] }> {
    const future = await this.episodeService.getFuture(user);
    const past = await this.episodeService.getPast(user);
    return { future, past };
  }

  @Get(':id')
  public getOne(@Param('id') id: number): Promise<EpisodeEntity> {
    return this.episodeService.getOne(id);
  }
}
