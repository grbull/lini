/* eslint-disable init-declarations */
import { NotFoundException } from '@nestjs/common';
import { Connection, createConnection, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { ShowEntity } from '../show/show.entity';
import { DayOfWeek, TvMazeShow } from '../tvmaze/tvmaze.types';
import { TvMazeShowToEntity } from '../tvmaze/tvmaze.utils';
import { UserEntity, UserRole, UserTheme } from '../user/user.entity';
import {
  SubscriptionCreateDto,
  SubscriptionRemoveDto,
  SubscriptionUpdateDto,
} from './subscription.dto';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

const seedShow: TvMazeShow = {
  id: 216,
  url: 'https://www.tvmaze.com/shows/216/rick-and-morty',
  name: 'Rick and Morty',
  type: 'Animation',
  language: 'English',
  genres: ['Comedy', 'Adventure', 'Science-Fiction'],
  status: 'Running',
  runtime: 30,
  averageRuntime: 30,
  premiered: '2013-12-02',
  officialSite: 'http://www.adultswim.com/videos/rick-and-morty',
  schedule: { time: '23:30', days: [DayOfWeek.Sunday] },
  rating: { average: 9 },
  weight: 99,
  network: {
    id: 10,
    name: 'Adult Swim',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
  },
  dvdCountry: null,
  externals: { tvrage: 33381, thetvdb: 275274, imdb: 'tt2861424' },
  image: {
    medium:
      'https://static.tvmaze.com/uploads/images/medium_portrait/1/3603.jpg',
    original:
      'https://static.tvmaze.com/uploads/images/original_untouched/1/3603.jpg',
  },
  summary:
    '<p>Rick is a mentally gifted, but sociopathic and alcoholic scientist and a grandfather to Morty; an awkward, impressionable, and somewhat spineless teenage boy. Rick moves into the family home of Morty, where he immediately becomes a bad influence.</p>',
  updated: 1621162918,
  _links: {
    self: { href: 'https://api.tvmaze.com/shows/216' },
    previousepisode: { href: 'https://api.tvmaze.com/episodes/1839344' },
    nextepisode: { href: 'https://api.tvmaze.com/episodes/2055782' },
  },
};

const seedUser: Omit<
  UserEntity,
  'id' | 'subscriptions' | 'authTokens' | 'dateCreated' | 'dateUpdated'
> = {
  email: 'email',
  role: UserRole.USER,
  theme: UserTheme.AUTO,
  dataSaving: false,
  notifications: false,
  pushSubscriptions: [],
};

describe('Subscription Service', () => {
  let connection: Connection;

  let showRepository: Repository<ShowEntity>;
  let userRepository: Repository<UserEntity>;
  let subscriptionRepository: Repository<SubscriptionEntity>;

  let subscriptionService: SubscriptionService;
  let loggerService: LoggerService;

  let user: UserEntity;
  let show: ShowEntity;

  beforeAll(async () => {
    connection = await createConnection('test');
    showRepository = connection.getRepository(ShowEntity);
    subscriptionRepository = connection.getRepository(SubscriptionEntity);
    userRepository = connection.getRepository(UserEntity);

    loggerService = new LoggerService();
    subscriptionService = new SubscriptionService(
      loggerService,
      subscriptionRepository
    );

    // Add a show
    await showRepository.save(
      showRepository.create(TvMazeShowToEntity(seedShow, null, null))
    );
    show = await showRepository.findOneOrFail(seedShow.id);
    // Add a user
    user = await userRepository.save(userRepository.create(seedUser));
  });
  afterAll(async () => await connection.close());

  describe('create', () => {
    const createDto: SubscriptionCreateDto = { show: seedShow.id };
    const expectedEntity = {
      dateDeleted: null,
      id: 1,
      notifications: true,
    };

    it('should create a subscription', async () => {
      const subscription = await subscriptionService.create(user, createDto);

      expect(subscription).toMatchObject({ ...expectedEntity, show });
    });

    it('should return an existing subscription', async () => {
      const subscription = await subscriptionService.create(user, createDto);

      expect(subscription).toMatchObject({ ...expectedEntity, show });
    });
  });

  describe('getAll', () => {
    it('should return all subscription', async () => {
      const subscriptions = await subscriptionService.getAll(user);

      expect(subscriptions).toHaveLength(1);
    });
  });

  describe('update', () => {
    const updateDto: SubscriptionUpdateDto = {
      show: seedShow.id,
      notifications: false,
    };
    const expectedEntity = {
      dateDeleted: null,
      id: 1,
      notifications: false,
    };

    it('should update a subscription', async () => {
      const subscription = await subscriptionService.update(user, updateDto);

      expect(subscription).toMatchObject({ ...expectedEntity, show });
    });

    it('should throw an error if does not exist', async () => {
      const error = new NotFoundException();

      await expect(
        subscriptionService.update(user, { ...updateDto, show: 0 })
      ).rejects.toThrow(error);
    });
  });

  describe('remove', () => {
    const removeDto: SubscriptionRemoveDto = {
      show: seedShow.id,
    };

    it('should remove a subscription', async () => {
      const deletedSubscription = await subscriptionService.remove(
        user,
        removeDto
      );
      const expectedEntity = {
        id: 1,
        notifications: false,
      };

      expect(deletedSubscription).toMatchObject({ ...expectedEntity, show });
    });

    it('should throw an error if does not exist', async () => {
      const error = new NotFoundException();

      await expect(subscriptionService.remove(user, removeDto)).rejects.toThrow(
        error
      );
    });
  });
});
