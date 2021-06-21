import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountryService } from '../country/country.service';
import { LoggerService } from '../logger/logger.service';
import { TvMazeWebChannel } from '../tvmaze/tvmaze.types';
import { WebChannelEntity } from './web_channel.entity';

@Injectable()
export class WebChannelService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly countryService: CountryService,
    @InjectRepository(WebChannelEntity)
    private readonly webChannelRepository: Repository<WebChannelEntity>
  ) {
    this.loggerService.setContext('WebChannelService');
  }

  public async createOrUpdate(
    webChannel: TvMazeWebChannel
  ): Promise<WebChannelEntity> {
    const country = webChannel.country
      ? await this.countryService.findOrCreate(webChannel.country)
      : null;
    return this.webChannelRepository.save({
      ...webChannel,
      country: country?.id,
    });
  }
}
