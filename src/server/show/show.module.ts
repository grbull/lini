import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { NetworkModule } from '../network/network.module';
import { WebChannelModule } from '../web_channel/web_channel.module';
import { ShowController } from './show.controller';
import { ShowEntity } from './show.entity';
import { ShowService } from './show.service';

@Module({
  imports: [
    LoggerModule,
    NetworkModule,
    WebChannelModule,
    TypeOrmModule.forFeature([ShowEntity]),
  ],
  providers: [ShowService],
  controllers: [ShowController],
  exports: [ShowService],
})
export class ShowModule {}
