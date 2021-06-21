import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EpisodeService } from '../episode/episode.service';
import { LoggerService } from '../logger/logger.service';
import { PushSubscriptionService } from '../push_subscription/push_subscription.service';
import { UserService } from '../user/user.service';
import { formatEpisodeCode } from '../utils/formatEpisodeCode';
import { NotificationDto } from './notification.dto';

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
          const title = `${subscription.show.name} - ${formatEpisodeCode(
            episode.season,
            episode.number
          )}`;

          const message = episode.summary
            ? `${episode.airdate}\n\n${episode.summary}`
            : `${episode.airdate}`;

          const url = `${this.configService.get('CLIENT_URL')}/episode/${
            episode.id
          }`;

          const notificationDto: NotificationDto = {
            title,
            message,
            url,
            icon: subscription.show.imageMedium || undefined,
          };

          await this.pushSubscriptionService.sendNotificationToUser(
            user.id,
            notificationDto
          );
        }
      }
    }
  }
}
