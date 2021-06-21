import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountryService } from '../country/country.service';
import { LoggerService } from '../logger/logger.service';
import { TvMazeNetwork } from '../tvmaze/tvmaze.types';
import { NetworkEntity } from './network.entity';

@Injectable()
export class NetworkService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly countryService: CountryService,
    @InjectRepository(NetworkEntity)
    private readonly networkRepository: Repository<NetworkEntity>
  ) {
    this.loggerService.setContext('NetworkService');
  }

  public async createOrUpdate(network: TvMazeNetwork): Promise<NetworkEntity> {
    const country = await this.countryService.findOrCreate(network.country);
    return this.networkRepository.save({ ...network, country: country.id });
  }
}
