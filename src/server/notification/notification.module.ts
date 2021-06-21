import { Module } from '@nestjs/common';

import { EpisodeModule } from '../episode/episode.module';
import { LoggerModule } from '../logger/logger.module';
import { PushSubscriptionModule } from '../push_subscription/push_subscription.module';
import { UserModule } from '../user/user.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [LoggerModule, PushSubscriptionModule, UserModule, EpisodeModule],
  providers: [NotificationService],
})
export class NotificationModule {}
