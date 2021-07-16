import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';

import { UserController } from './user.controller';
import { UserUpdateDto } from './user.dto';
import { UserEntity, UserRole, UserTheme } from './user.entity';
import { UserService } from './user.service';

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

describe('User Controller', () => {
  const userService = createMock<UserService>();
  const userController = new UserController(userService);

  describe('getUser', () => {
    it('should return user', () => {
      expect(userController.getUser(user)).toStrictEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should call userService.updateOne', async () => {
      const userUpdateDto: UserUpdateDto = {
        notifications: true,
        theme: 'auto',
      };

      await userController.updateUser(user, userUpdateDto);

      expect(jest.spyOn(userService, 'updateOne')).toBeCalled();
    });
  });

  describe('getUserData', () => {
    it('should call userService.getUserData', async () => {
      const expressReponse = createMock<Response>();

      await userController.getUserData(user, expressReponse);

      expect(jest.spyOn(userService, 'getUserData')).toBeCalled();
      expect(jest.spyOn(expressReponse, 'attachment')).toBeCalled();
    });
  });
});
