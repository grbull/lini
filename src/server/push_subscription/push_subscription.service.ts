import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import webpush, { PushSubscription } from 'web-push';

import { LoggerService } from '../logger/logger.service';
import { NotificationDto } from '../notification/notification.dto';
import { UserEntity } from '../user/user.entity';
import { PushSubscriptionCreateDto } from './push_subscription.dto';
import { PushSubscriptionEntity } from './push_subscription.entity';

@Injectable()
export class PushSubscriptionService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(PushSubscriptionEntity)
    private readonly pushSubscriptionRepository: Repository<PushSubscriptionEntity>,
    private readonly configService: ConfigService
  ) {
    this.loggerService.setContext('PushSubscriptionService');
    this.setVapidDetails();
  }

  private setVapidDetails(): void {
    const clientURL = this.configService.get('CLIENT_URL');
    const publicKey = this.configService.get('WEB_PUSH_PUBLIC');
    const privateKey = this.configService.get('WEB_PUSH_PRIVATE');
    if (!clientURL || !publicKey || !privateKey) {
      throw new TypeError(
        'Missing ENV variables; CLIENT_URL, WEB_PUSH_PUBLIC, WEB_PUSH_PRIVATE'
      );
    }
    webpush.setVapidDetails(clientURL, publicKey, privateKey);
  }

  public async create(
    user: UserEntity,
    createDto: PushSubscriptionCreateDto
  ): Promise<void> {
    const existingSub = await this.pushSubscriptionRepository.findOne({
      user: user.id,
      endpoint: createDto.endpoint,
    });

    if (existingSub) {
      return;
    }

    const pushSubscription = await this.pushSubscriptionRepository.save(
      this.pushSubscriptionRepository.create({ user: user.id, ...createDto })
    );

    await this.sendNotification(pushSubscription, {
      title: 'Success',
      message: 'Push notifications enabled.',
    });
  }

  public async sendNotification(
    pushSubscriptionEntity: PushSubscriptionEntity,
    payload: { title: string; message: string }
  ): Promise<void> {
    const pushSubscription: PushSubscription = {
      endpoint: pushSubscriptionEntity.endpoint,
      keys: {
        p256dh: pushSubscriptionEntity.p256dh,
        auth: pushSubscriptionEntity.auth,
      },
    };

    try {
      await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
    } catch (error) {
      if (error.statusCode === 410) {
        await this.pushSubscriptionRepository.delete(pushSubscriptionEntity.id);
        this.loggerService.error('Deleted inactive push subscription', error);
      } else {
        this.loggerService.error(
          'Unhandled error while sending push notification',
          error
        );
      }
    }
  }

  public async sendNotificationToUser(
    userId: number,
    payload: NotificationDto
  ): Promise<void> {
    const subscriptions = await this.pushSubscriptionRepository.find({
      user: userId,
    });

    for (const subscription of subscriptions) {
      this.loggerService.log(
        `Sending push notification to: ${JSON.stringify(
          subscription
        )} payload: ${JSON.stringify(payload)}`
      );
      await this.sendNotification(subscription, payload);
    }
  }
}
