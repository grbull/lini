import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { TvMazeCountry } from '../tvmaze/tvmaze.types';
import { CountryEntity } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>
  ) {
    this.loggerService.setContext('CountryService');
  }

  public async findOrCreate(
    tvMazeCountry: TvMazeCountry
  ): Promise<CountryEntity> {
    try {
      return await this.countryRepository.findOneOrFail({
        code: tvMazeCountry.code,
      });
    } catch {
      return await this.countryRepository.save(tvMazeCountry);
    }
  }
}
