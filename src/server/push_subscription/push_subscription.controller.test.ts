import { createMock } from '@golevelup/ts-jest';

import { UserEntity, UserRole, UserTheme } from '../user/user.entity';
import { PushSubscriptionController } from './push_subscription.controller';
import { PushSubscriptionCreateDto } from './push_subscription.dto';
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

describe('PushSubscription Controller', () => {
  const pushSubscriptionService = createMock<PushSubscriptionService>();
  const pushSubscriptionController = new PushSubscriptionController(
    pushSubscriptionService
  );

  describe('create', () => {
    it('should call pushSubscriptionService.create', async () => {
      const pushSubscriptionCreateDto: PushSubscriptionCreateDto = {
        auth: '',
        endpoint: '',
        p256dh: '',
      };

      await pushSubscriptionController.create(user, pushSubscriptionCreateDto);

      expect(jest.spyOn(pushSubscriptionService, 'create')).toBeCalled();
    });
  });
});
