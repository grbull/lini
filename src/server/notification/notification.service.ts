import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EpisodeService } from '../episode/episode.service';
import { LoggerService } from '../logger/logger.service';
import { PushSubscriptionService } from '../push_subscription/push_subscription.service';
import { UserService } from '../user/user.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly pushSubscriptionService: PushSubscriptionService,
    private readonly userService: UserService,
    private readonly episodeService: EpisodeService
  ) {
    this.loggerService.setContext('NotificationService');
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async execdispatch(): Promise<void> {
    if (this.configService.get('NODE_ENV') === 'production') {
      this.loggerService.log('Sending notifications started.');
      await this.dispatch();
      this.loggerService.log('Sending notifications complete.');
    }
  }

  private async dispatch(): Promise<void> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMinutes(startDate.getMinutes() + 10);
    const userCount = await this.userService.getCount();

    for (let i = 0; i < userCount; i++) {
      const user = await this.userService.takeOne(i);
      if (!user) {
        break;
      }

      for (const subscription of user.subscriptions) {
        const episodes = await this.episodeService.findByTime(
          subscription.show.id,
          startDate,
          endDate
        );
        for (const episode of episodes) {
          await this.pushSubscriptionService.sendNotificationToUser(user.id, {
            title: `An episode of ${subscription.show.name} airs @ ${episode.airdate}`,
            message: `S${episode.season}E${episode.number} - ${
              episode.summary || 'No summary available.'
            }`,
          });
        }
      }
    }
  }
  // cronjob to send notifications
  // every 15min
  // map through users
  // map through users subscriptions
  // check every subscription for show
  // check every show for episode in 15min blocks, send out notification
}
