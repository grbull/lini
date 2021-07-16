/* eslint-disable init-declarations */
import { createMock } from '@golevelup/ts-jest';

import { UserEntity, UserRole, UserTheme } from '../user/user.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

const subscriptionEntity = {
  id: 1,
  dateCreated: '2021-05-20T14:27:26.876Z',
  dateDeleted: null,
  user: 1,
  show: 216,
};
const removedEntity = {
  id: 1,
  dateCreated: '2021-05-20T14:27:26.876Z',
  dateDeleted: '2021-05-20T14:28:26.876Z',
  user: 1,
  show: 216,
};

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

describe('Subscription Controller', () => {
  const subscriptionService = createMock<SubscriptionService>({
    getAll: jest.fn().mockReturnValue([subscriptionEntity]),
    create: jest.fn().mockReturnValue(subscriptionEntity),
    remove: jest.fn().mockReturnValue(removedEntity),
  });
  const subscriptionController = new SubscriptionController(
    subscriptionService
  );

  describe('getAll', () => {
    it('should return all subscriptions', async () => {
      const result = await subscriptionController.getAll(user);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject(subscriptionEntity);
      expect(jest.spyOn(subscriptionService, 'getAll')).toHaveBeenCalledTimes(
        1
      );
    });
  });

  describe('create', () => {
    it('should create a subscription', async () => {
      const result = await subscriptionController.create(
        user,
        subscriptionEntity
      );

      expect(result).toMatchObject(subscriptionEntity);
      expect(jest.spyOn(subscriptionService, 'create')).toHaveBeenCalledTimes(
        1
      );
    });
  });

  describe('remove', () => {
    it('should create a subscription', async () => {
      const result = await subscriptionController.remove(
        user,
        subscriptionEntity
      );

      expect(result).toMatchObject(removedEntity);
      expect(jest.spyOn(subscriptionService, 'remove')).toHaveBeenCalledTimes(
        1
      );
    });
  });
});
