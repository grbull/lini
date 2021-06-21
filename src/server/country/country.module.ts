import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
