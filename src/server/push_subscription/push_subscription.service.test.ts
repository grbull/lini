/* eslint-disable init-declarations */
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection, Repository } from 'typeorm';
import webpush, { SendResult } from 'web-push';

import { LoggerService } from '../logger/logger.service';
import { NotificationDto } from '../notification/notification.dto';
import { UserEntity, UserRole, UserTheme } from '../user/user.entity';
import { PushSubscriptionCreateDto } from './push_subscription.dto';
import { PushSubscriptionEntity } from './push_subscription.entity';
import { PushSubscriptionService } from './push_subscription.service';

const user: UserEntity = {
  email: 'username@website.com',
  role: UserRole.USER,
  theme: UserTheme.AUTO,
  notifications: false,
  id: 1,
  dateCreated: '2021-05-20T14:37:43.490Z',
  dateUpdated: '2021-05-20T14:37:43.490Z',
  subscriptions: [],
  authTokens: [],
  pushSubscriptions: [],
};

describe('PushSubscription Service', () => {
  let connection: Connection;
  let pushSubscriptionRepository: Repository<PushSubscriptionEntity>;

  let pushSubscriptionService: PushSubscriptionService;

  const logNormal = jest.fn();
  const logError = jest.fn();
  const loggerService = createMock<LoggerService>({
    log: logNormal,
    error: logError,
  });
  const configService = createMock<ConfigService>({
    get: jest.fn((prop): string => {
      if (prop === 'CLIENT_URL') {
        return 'https://hi.com';
      }
      if (prop === 'WEB_PUSH_PUBLIC') {
        return 'BDbS0SoLc5sd_hiNsKZ5CbvBTTimhaQ8uJC1PfYFpfeTqOcp1R3Xxb7wyscJsbZ05BBej4iecYIkiW2MPuiUVqk';
      }
      if (prop === 'WEB_PUSH_PRIVATE') {
        return 'jgwV68HePd-CY4TU1DWUfLqpt8YyXvijOP9SvjzY88A';
      }
      return '';
    }),
  });
  const setVapidDetails = jest.spyOn(webpush, 'setVapidDetails');
  const sendNotification = jest
    .spyOn(webpush, 'sendNotification')
    .mockImplementation((): any => createMock<SendResult>());

  beforeAll(async () => {
    connection = await createConnection('test');
    pushSubscriptionRepository = connection.getRepository(
      PushSubscriptionEntity
    );
    const userRepository = connection.getRepository(UserEntity);
    await userRepository.save(userRepository.create(user));

    pushSubscriptionService = new PushSubscriptionService(
      loggerService,
      pushSubscriptionRepository,
      configService
    );
  });

  it('should set vapid details upon creation', () => {
    expect(jest.spyOn(configService, 'get')).toBeCalledTimes(3);
    expect(setVapidDetails).toBeCalledTimes(1);
  });

  describe('create', () => {
    it('should create a subscription and send a notification if unique/new', async () => {
      const pushSubscriptionCreateDto: PushSubscriptionCreateDto = {
        auth: '',
        endpoint: '',
        p256dh: '',
      };

      await pushSubscriptionService.create(user, pushSubscriptionCreateDto);

      expect(sendNotification).toBeCalledTimes(1);
    });

    it('should create a subscription', async () => {
      const pushSubscriptionCreateDto: PushSubscriptionCreateDto = {
        auth: '',
        endpoint: '',
        p256dh: '',
      };

      await pushSubscriptionService.create(user, pushSubscriptionCreateDto);

      expect(sendNotification).toBeCalledTimes(1);
    });
  });

  describe('sendNotificationToUser', () => {
    it('should send a notification', async () => {
      const notificationDto: NotificationDto = {
        date: '',
        message: 'test msg',
        title: 'title',
        url: 'url',
      };

      await pushSubscriptionService.sendNotificationToUser(
        user.id,
        notificationDto
      );

      expect(sendNotification).toBeCalledTimes(2);
    });

    it('should should handle unknown error', async () => {
      const sendNotification = jest
        .spyOn(webpush, 'sendNotification')
        .mockImplementation((): any => {
          throw { statusCode: 500 };
        });

      const notificationDto: NotificationDto = {
        date: '',
        message: 'test msg',
        title: 'title',
        url: 'url',
      };

      await pushSubscriptionService.sendNotificationToUser(
        user.id,
        notificationDto
      );

      expect(sendNotification).toBeCalledTimes(3);
      expect(logError).toBeCalledTimes(1);
    });

    it('should should handle 410 error', async () => {
      const sendNotification = jest
        .spyOn(webpush, 'sendNotification')
        .mockImplementation((): any => {
          throw { statusCode: 410 };
        });

      const notificationDto: NotificationDto = {
        date: '',
        message: 'test msg',
        title: 'title',
        url: 'url',
      };

      await pushSubscriptionService.sendNotificationToUser(
        user.id,
        notificationDto
      );

      expect(sendNotification).toBeCalledTimes(4);
      expect(logError).toBeCalledTimes(2);
    });
  });
});
