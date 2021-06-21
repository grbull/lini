import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryModule } from '../country/country.module';
import { LoggerModule } from '../logger/logger.module';
import { NetworkEntity } from './network.entity';
import { NetworkService } from './network.service';

@Module({
  imports: [
    LoggerModule,
    CountryModule,
    TypeOrmModule.forFeature([NetworkEntity]),
  ],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
