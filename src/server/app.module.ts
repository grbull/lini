import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { EpisodeModule } from './episode/episode.module';
import { LoggerModule } from './logger/logger.module';
import { MailModule } from './mail/mail.module';
import { NetworkModule } from './network/network.module';
import { NotificationModule } from './notification/notification.module';
import { PushSubscriptionModule } from './push_subscription/push_subscription.module';
import { ShowModule } from './show/show.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TvMazeModule } from './tvmaze/tvmaze.module';
import { UserModule } from './user/user.module';
import { WebChannelModule } from './web_channel/web_channel.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 360,
      limit: 100,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),

    LoggerModule,

    AuthModule,
    CountryModule,
    EpisodeModule,
    MailModule,
    NetworkModule,
    ShowModule,
    SubscriptionModule,
    TvMazeModule,
    UserModule,
    WebChannelModule,
    PushSubscriptionModule,
    NotificationModule,
  ],
})
export class AppModule {}
