import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { PushSubscriptionController } from './push_subscription.controller';
import { PushSubscriptionEntity } from './push_subscription.entity';
import { PushSubscriptionService } from './push_subscription.service';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([PushSubscriptionEntity])],
  providers: [PushSubscriptionService],
  controllers: [PushSubscriptionController],
  exports: [PushSubscriptionService],
})
export class PushSubscriptionModule {}
