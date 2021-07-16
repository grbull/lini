/* eslint-disable init-declarations */
import { Connection, createConnection, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { UserUpdateDto } from './user.dto';
import { UserEntity, UserRole, UserTheme } from './user.entity';
import { UserService } from './user.service';

describe('User Service', () => {
  let connection: Connection;
  let loggerService: LoggerService;
  let userRepository: Repository<UserEntity>;
  let userService: UserService;

  let adminUser: UserEntity;
  let regularUser: UserEntity;

  beforeAll(async () => {
    connection = await createConnection('test');
    loggerService = new LoggerService();
    userRepository = connection.getRepository(UserEntity);
    userService = new UserService(loggerService, userRepository);
  });
  afterAll(async () => await connection.close());
  describe('createOne', () => {
    it('should create a user with id 1', async () => {
      const user: Partial<UserEntity> = {
        id: 1,
        email: 'admin@email.com',
        role: UserRole.UNVERIFIED,
      };

      adminUser = await userService.createOne('admin@email.com');

      expect(adminUser).toMatchObject(user);
    });
    it('should create a user with id 2', async () => {
      const user: Partial<UserEntity> = {
        id: 2,
        email: 'user@email.com',
        role: UserRole.UNVERIFIED,
      };

      regularUser = await userService.createOne('user@email.com');

      expect(regularUser).toMatchObject(user);
    });
  });

  describe('updateOne', () => {
    it('should update users theme', async () => {
      const updateDto: UserUpdateDto = {
        notifications: true,
        theme: UserTheme.DARK,
      };
      adminUser = await userService.updateOne(adminUser, updateDto);

      expect(adminUser).toMatchObject({ theme: UserTheme.DARK });
    });

    it('should update users notification setting', async () => {
      const updateDto: UserUpdateDto = {
        notifications: false,
        theme: UserTheme.AUTO,
      };
      adminUser = await userService.updateOne(adminUser, updateDto);

      expect(adminUser).toMatchObject({ notifications: false });
    });

    it('should throw an error', async () => {
      const updateDto: UserUpdateDto = {
        notifications: false,
        theme: UserTheme.AUTO,
      };

      await expect(
        async () =>
          await userService.updateOne({ ...regularUser, id: 3 }, updateDto)
      ).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return user 1', async () => {
      const result = await userService.findOne({ id: 1 });

      expect(result).toMatchObject(adminUser);
    });

    it('should return user 2', async () => {
      const result = await userService.findOne({ id: 2 });

      expect(result).toMatchObject(regularUser);
    });

    it('should return undefined', async () => {
      const result = await userService.findOne({ id: 3 });

      expect(result).toBeUndefined();
    });
  });

  describe('findOneOrFail', () => {
    it('should return user 1', async () => {
      const result = await userService.findOneOrFail({ id: 1 });

      expect(result).toMatchObject(adminUser);
    });

    it('should return user 2', async () => {
      const result = await userService.findOneOrFail({ id: 2 });

      expect(result).toMatchObject(regularUser);
    });

    it('should throw an error', async () => {
      await expect(
        async () => await userService.findOneOrFail({ id: 3 })
      ).rejects.toThrow();
    });
  });

  describe('markVerified', () => {
    it('should mark user 1 as admin', async () => {
      adminUser = await userService.markVerified(adminUser);

      expect(adminUser).toMatchObject({ role: UserRole.ADMIN });
    });

    it('should mark user 2 as user', async () => {
      regularUser = await userService.markVerified(regularUser);

      expect(regularUser).toMatchObject({ role: UserRole.USER });
    });
  });

  describe('getCount', () => {
    it('should return the correct count', async () => {
      const count = await userService.getCount();

      expect(count).toBe(2);
    });
  });

  describe('takeOne', () => {
    it('should return the first user', async () => {
      expect(await userService.takeOne(0)).toMatchObject(adminUser);
    });

    it('should return the second user', async () => {
      expect(await userService.takeOne(1)).toMatchObject(regularUser);
    });

    it('should return undefined', async () => {
      expect(await userService.takeOne(2)).toBeUndefined();
    });
  });

  describe('getUserData', () => {
    it('should return user 1 data', async () => {
      const userData = {
        id: 1,
        email: 'admin@email.com',
        role: 'admin',
        theme: 'auto',
        notifications: false,
        authTokens: [],
        pushSubscriptions: [],
        subscriptions: [],
      };

      expect(await userService.getUserData(adminUser)).toMatchObject(userData);
    });

    it('should return undefined', async () => {
      expect(
        await userService.getUserData({ ...adminUser, id: 3 })
      ).toBeUndefined();
    });
  });
});
