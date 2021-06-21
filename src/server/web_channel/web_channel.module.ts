import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryModule } from '../country/country.module';
import { LoggerModule } from '../logger/logger.module';
import { WebChannelEntity } from './web_channel.entity';
import { WebChannelService } from './web_channel.service';

@Module({
  imports: [
    LoggerModule,
    CountryModule,
    TypeOrmModule.forFeature([WebChannelEntity]),
  ],
  providers: [WebChannelService],
  exports: [WebChannelService],
})
export class WebChannelModule {}
