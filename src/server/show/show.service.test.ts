/* eslint-disable init-declarations */
import { Connection, createConnection, Repository } from 'typeorm';

import { CountryEntity } from '../country/country.entity';
import { CountryService } from '../country/country.service';
import { LoggerService } from '../logger/logger.service';
import { NetworkEntity } from '../network/network.entity';
import { NetworkService } from '../network/network.service';
import { TvMazeShow, TvMazeShowEmbedded } from '../tvmaze/tvmaze.types';
import { WebChannelEntity } from '../web_channel/web_channel.entity';
import { WebChannelService } from '../web_channel/web_channel.service';
import { ShowEntity } from './show.entity';
import { ShowService } from './show.service';

const seedShows: TvMazeShow[] = [
  {
    id: 1000,
    url: 'https://www.tvmaze.com/shows/1000/squidbillies',
    name: 'Squidbillies',
    type: 'Animation',
    language: 'English',
    genres: ['Comedy'],
    status: 'Running',
    runtime: 15,
    averageRuntime: 15,
    premiered: '2005-10-16',
    officialSite: null,
    schedule: { time: '00:00', days: ['Sunday'] },
    rating: { average: 7.1 },
    weight: 52,
    network: {
      id: 10,
      name: 'Adult Swim',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York',
      },
    },
    webChannel: null,
    dvdCountry: null,
    externals: { tvrage: 2292, thetvdb: 79017, imdb: 'tt0457146' },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/6/16556.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/6/16556.jpg',
    },
    summary:
      "<p>Watch the <b>Squidbillies</b> as the Cuylers kick the ass of America's toughest issues, including marriage inequality, taint cancer, speciesism, and the impending Russian snake apocalypse. It's good clean family fun for childless families!</p>",
    updated: 1573498199,
    _links: {
      self: { href: 'https://api.tvmaze.com/shows/1000' },
      previousepisode: {
        href: 'https://api.tvmaze.com/episodes/1715443',
      },
    },
  },
  {
    id: 1001,
    url: 'https://www.tvmaze.com/shows/1001/bag-of-bones',
    name: 'Bag of Bones',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Horror', 'Mystery'],
    status: 'Ended',
    runtime: 120,
    averageRuntime: 120,
    premiered: '2011-12-11',
    officialSite: null,
    schedule: { time: '21:00', days: ['Sunday'] },
    rating: { average: 6.6 },
    weight: 44,
    network: null,
    webChannel: { id: 1, name: 'Netflix', country: null },
    dvdCountry: null,
    externals: { tvrage: 29816, thetvdb: 252870, imdb: 'tt1212452' },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/6/16571.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/6/16571.jpg',
    },
    summary:
      "<p><b>Bag of Bones</b> is a ghost story of grief and lost love's enduring bonds, about an innocent child caught in a terrible crossfire and a new love haunted by past secrets.</p>",
    updated: 1574386161,
    _links: {
      self: { href: 'https://api.tvmaze.com/shows/1001' },
      previousepisode: { href: 'https://api.tvmaze.com/episodes/98885' },
    },
  },
];
// why cant i infer Omit<ShowEntity, 'dateCreated', 'isSeeded' | 'dateUpdated'>[]
const showEntities = [
  {
    id: 1000,
    name: 'Squidbillies',
    type: 'Animation',
    language: 'English',
    genres: ['Comedy'],
    status: 'Running',
    runtime: 15,
    runtimeAverage: 15,
    datePremiered: '2005-10-16',
    officialSite: null,
    scheduleTime: '00:00:00',
    scheduleDays: ['Sunday'],
    rating: 7.1,
    weight: 52,
    tvrage: 2292,
    thetvdb: 79017,
    imdb: 'tt0457146',
    imageMedium: '/uploads/images/medium_portrait/6/16556.jpg',
    imageOriginal: '/uploads/images/original_untouched/6/16556.jpg',
    summary:
      "Watch the Squidbillies as the Cuylers kick the ass of America's toughest issues, including marriage inequality, taint cancer, speciesism, and the impending Russian snake apocalypse. It's good clean family fun for childless families!",
    network: {
      id: 10,
      name: 'Adult Swim',
      country: {
        code: 'US',
        id: 1,
        name: 'United States',
        timezone: 'America/New_York',
      },
    },
    webChannel: null,
  },
  {
    id: 1001,
    name: 'Bag of Bones',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Horror', 'Mystery'],
    status: 'Ended',
    runtime: 120,
    runtimeAverage: 120,
    datePremiered: '2011-12-11',
    officialSite: null,
    scheduleTime: '21:00:00',
    scheduleDays: ['Sunday'],
    rating: 6.6,
    weight: 44,
    tvrage: 29816,
    thetvdb: 252870,
    imdb: 'tt1212452',
    imageMedium: '/uploads/images/medium_portrait/6/16571.jpg',
    imageOriginal: '/uploads/images/original_untouched/6/16571.jpg',
    summary:
      "Bag of Bones is a ghost story of grief and lost love's enduring bonds, about an innocent child caught in a terrible crossfire and a new love haunted by past secrets.",
    network: null,
    webChannel: { id: 1, name: 'Netflix', country: null },
  },
];

describe('Show Service', () => {
  let connection: Connection;
  let countryRepository: Repository<CountryEntity>;
  let networkRepository: Repository<NetworkEntity>;
  let webChannelRepository: Repository<WebChannelEntity>;
  let showRepository: Repository<ShowEntity>;

  let loggerService: LoggerService;
  let countryService: CountryService;
  let networkService: NetworkService;
  let webChannelService: WebChannelService;
  let showService: ShowService;

  beforeAll(async () => {
    connection = await createConnection('test');
    countryRepository = connection.getRepository(CountryEntity);
    networkRepository = connection.getRepository(NetworkEntity);
    webChannelRepository = connection.getRepository(WebChannelEntity);
    showRepository = connection.getRepository(ShowEntity);

    loggerService = new LoggerService();
    countryService = new CountryService(loggerService, countryRepository);
    networkService = new NetworkService(
      loggerService,
      countryService,
      networkRepository
    );
    webChannelService = new WebChannelService(
      loggerService,
      countryService,
      webChannelRepository
    );
    showService = new ShowService(
      loggerService,
      networkService,
      webChannelService,
      showRepository
    );
  });
  afterAll(async () => await connection.close());

  describe('createMany', () => {
    it('should handle an empty array', async () => {
      const result = await showService.createMany([]);

      expect(result).toStrictEqual([]);
    });

    it('should create 2 show', async () => {
      const result = await showService.createMany(seedShows);

      expect(result).toMatchObject(showEntities);
    });
  });

  describe('getShowsToSeed', () => {
    it('should return 2 show', async () => {
      const result = await showService.getShowsToSeed();

      expect(result).toHaveLength(2);
    });
  });

  describe('markSeeded', () => {
    it('should mark our two show as seeded', async () => {
      await showService.markSeeded(seedShows[0].id);
      await showService.markSeeded(seedShows[1].id);

      const result = await showService.getShowsToSeed();

      expect(result).toHaveLength(0);
    });
  });

  describe('getShowsLastUpdated', () => {
    it('should return 2 show', async () => {
      const result = await showService.getShowsLastUpdated();

      expect(result).toHaveLength(2);
    });
  });

  describe('getOne', () => {
    it('should return a show', async () => {
      const result = await showService.getOne(seedShows[0].id);

      expect(result).toMatchObject({ ...showEntities[0] });
    });

    it('should throw an error if not found', async () => {
      await expect(async () => await showService.getOne(99)).rejects.toThrow();
    });
  });

  describe('updateOne', () => {
    it('should update one show', async () => {
      const updatedShow: TvMazeShowEmbedded = {
        ...seedShows[1],
        _embedded: {
          episodes: [],
        },
        officialSite: 'updated',
      };

      const result = await showService.updateOne(updatedShow);

      expect(result).toMatchObject({
        ...showEntities[1],
        officialSite: 'updated',
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete series', async () => {
      await showService.deleteOne(showEntities[1].id);
      const result = await showService.getShowsLastUpdated();

      expect(result).toHaveLength(1);
    });
  });

  describe('autoComplete', () => {
    it('should return matching series', async () => {
      const result = await showService.autoComplete('squid');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject(showEntities[0]);
    });
    it('should return empty array', async () => {
      const result = await showService.autoComplete('non-existent');

      expect(result).toHaveLength(0);
    });
  });

  describe('search', () => {
    it('should return matching series', async () => {
      const result = await showService.search('squid');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject(showEntities[0]);
    });
    it('should return empty array', async () => {
      const result = await showService.search('non-existent');

      expect(result).toHaveLength(0);
    });
  });
});
