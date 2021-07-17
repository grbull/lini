/* eslint-disable init-declarations */
import { NotFoundException } from '@nestjs/common';
import { Connection, createConnection, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { ShowEntity } from '../show/show.entity';
import { SubscriptionEntity } from '../subscription/subscription.entity';
import { SubscriptionService } from '../subscription/subscription.service';
import { TvMazeEpisode, TvMazeShow } from '../tvmaze/tvmaze.types';
import { TvMazeShowToEntity } from '../tvmaze/tvmaze.utils';
import { EpisodeEntity } from './episode.entity';
import { EpisodeService } from './episode.service';

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
  schedule: { time: '23:00', days: ['Sunday'] },
  rating: { average: 9 },
  weight: 100,
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
  externals: { tvrage: 33381, thetvdb: 275274, imdb: 'tt2861424' },
  image: {
    medium:
      'https://static.tvmaze.com/uploads/images/medium_portrait/1/3603.jpg',
    original:
      'https://static.tvmaze.com/uploads/images/original_untouched/1/3603.jpg',
  },
  summary:
    '<p>Rick is a mentally gifted, but sociopathic and alcoholic scientist and a grandfather to Morty; an awkward, impressionable, and somewhat spineless teenage boy. Rick moves into the family home of Morty, where he immediately becomes a bad influence.</p>',
  updated: 1626299432,
  _links: {
    self: { href: 'https://api.tvmaze.com/shows/216' },
    previousepisode: { href: 'https://api.tvmaze.com/episodes/2121946' },
    nextepisode: { href: 'https://api.tvmaze.com/episodes/2125581' },
  },
};

const seedEpisodes: TvMazeEpisode[] = [
  {
    id: 14308,
    url: 'https://www.tvmaze.com/episodes/14308/rick-and-morty-1x01-pilot',
    name: 'Pilot',
    season: 1,
    number: 1,
    type: 'regular',
    airdate: '2013-12-02',
    airtime: '22:30',
    airstamp: '2013-12-03T03:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/292/730352.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/292/730352.jpg',
    },
    summary:
      "<p>Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.</p>",
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14308' },
    },
  },
  {
    id: 14309,
    url: 'https://www.tvmaze.com/episodes/14309/rick-and-morty-1x02-lawnmower-dog',
    name: 'Lawnmower Dog',
    season: 1,
    number: 2,
    type: 'regular',
    airdate: '2013-12-09',
    airtime: '22:30',
    airstamp: '2013-12-10T03:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/292/730780.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/292/730780.jpg',
    },
    summary:
      "<p>Morty's small, white dog Snuffles gets on the nerves of the family, so Rick quickly builds a knowledge enhancing helmet for the dog. In the meantime, Rick and Morty decide to incept the dreams of Morty's math teacher, Mr. Goldenfold in order to convince him to give Morty A's in math. While the duo are sent on an epic dream world journey, Snuffles slowly gains sentience, which leads to a slew of even more problems.</p>",
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14309' },
    },
  },
  {
    id: 14310,
    url: 'https://www.tvmaze.com/episodes/14310/rick-and-morty-1x03-anatomy-park',
    name: 'Anatomy Park',
    season: 1,
    number: 3,
    type: 'regular',
    airdate: '2013-12-16',
    airtime: '22:30',
    airstamp: '2013-12-17T03:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37914.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37914.jpg',
    },
    summary:
      "<p>It's around Christmas time and Jerry's parents are coming to visit so he wants everybody to have a normal holiday without technology and without Rick. Fortunately for him, Rick has other plans, involving building a molecular theme park inside of a friend of his named Ruben, and he shrinks down Morty and sends him in there to test it out.</p>",
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14310' },
    },
  },
  {
    id: 14311,
    url: 'https://www.tvmaze.com/episodes/14311/rick-and-morty-1x04-m-night-shaym-aliens',
    name: 'M. Night Shaym-Aliens!',
    season: 1,
    number: 4,
    type: 'regular',
    airdate: '2014-01-13',
    airtime: '22:30',
    airstamp: '2014-01-14T03:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37915.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37915.jpg',
    },
    summary:
      '<p>Rick and Morty try to get to the bottom of a mystery in this M. Night Shyamalan style twistaroony of an episode.</p>',
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14311' },
    },
  },
  {
    id: 14312,
    url: 'https://www.tvmaze.com/episodes/14312/rick-and-morty-1x05-meeseeks-and-destroy',
    name: 'Meeseeks and Destroy',
    season: 1,
    number: 5,
    type: 'regular',
    airdate: '2014-01-20',
    airtime: '22:30',
    airstamp: '2014-01-21T03:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37916.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37916.jpg',
    },
    summary:
      '<p>Rick provides the family with a solution to their problems, freeing him up to go on an adventure led by Morty. Sounds good, better record this one, broh!</p>',
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14312' },
    },
  },
  {
    id: 14313,
    url: 'https://www.tvmaze.com/episodes/14313/rick-and-morty-1x06-rick-potion-9',
    name: 'Rick Potion #9',
    season: 1,
    number: 6,
    type: 'regular',
    airdate: '2014-01-27',
    airtime: '22:30',
    airstamp: '2014-01-28T03:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37917.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37917.jpg',
    },
    summary:
      "<p>Rick provides Morty with a love potion to get Jessica. The serum backfires &amp; Rick's attempt to fix things creates Cronenberg inspired monsters. Rick is okay with it but Morty feels partly responsible for creating a living nightmare.</p>",
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14313' },
    },
  },
  {
    id: 14314,
    url: 'https://www.tvmaze.com/episodes/14314/rick-and-morty-1x07-raising-gazorpazorp',
    name: 'Raising Gazorpazorp',
    season: 1,
    number: 7,
    type: 'regular',
    airdate: '2014-03-10',
    airtime: '22:30',
    airstamp: '2014-03-11T02:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37918.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37918.jpg',
    },
    summary:
      '<p>Morty convinces Rick to buy him a sexy robot. Guess what tho? Trouble happens, dog.</p>',
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14314' },
    },
  },
  {
    id: 14315,
    url: 'https://www.tvmaze.com/episodes/14315/rick-and-morty-1x08-rixty-minutes',
    name: 'Rixty Minutes',
    season: 1,
    number: 8,
    type: 'regular',
    airdate: '2014-03-17',
    airtime: '22:30',
    airstamp: '2014-03-18T02:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37919.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37919.jpg',
    },
    summary:
      "<p>When Rick hooks up the family's tv receiver with reality-tv shows from alternate dimensions, and allows them to see themselves in different versions of their lives, they begin to wonder what they have, and more importantly - what could have been.</p>",
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14315' },
    },
  },
  {
    id: 14316,
    url: 'https://www.tvmaze.com/episodes/14316/rick-and-morty-1x09-something-ricked-this-way-comes',
    name: 'Something Ricked This Way Comes',
    season: 1,
    number: 9,
    type: 'regular',
    airdate: '2014-03-24',
    airtime: '22:30',
    airstamp: '2014-03-25T02:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37920.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37920.jpg',
    },
    summary:
      '<p>Rick goes to battle with the devil, and Summer gets upset about it, broh. Plus Jerry and Morty hang out, broh!</p>',
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14316' },
    },
  },
  {
    id: 14317,
    url: 'https://www.tvmaze.com/episodes/14317/rick-and-morty-1x10-close-rick-counters-of-the-rick-kind',
    name: 'Close Rick-Counters of the Rick Kind',
    season: 1,
    number: 10,
    type: 'regular',
    airdate: '2014-04-07',
    airtime: '22:30',
    airstamp: '2014-04-08T02:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37921.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37921.jpg',
    },
    summary:
      '<p>Rick has a run in with some old associates, resulting in a fallout with Morty. You got any chips, broh?</p>',
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14317' },
    },
  },
  {
    id: 14318,
    url: 'https://www.tvmaze.com/episodes/14318/rick-and-morty-1x11-ricksy-business',
    name: 'Ricksy Business',
    season: 1,
    number: 11,
    type: 'regular',
    airdate: '2014-04-14',
    airtime: '22:30',
    airstamp: '2014-04-15T02:30:00+00:00',
    runtime: 30,
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_landscape/15/37922.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/15/37922.jpg',
    },
    summary:
      "<p>Beth and Jerry head for an iceberg of a date leaving Rick in charge. Morty doesn't get to go on any more adventures if the house isn't in the same condition when they get back.</p>",
    _links: {
      self: { href: 'https://api.tvmaze.com/episodes/14318' },
    },
  },
];

describe('Episode Service', () => {
  let connection: Connection;
  let showRepository: Repository<ShowEntity>;
  let episodeRepository: Repository<EpisodeEntity>;
  let subscriptionRepository: Repository<SubscriptionEntity>;
  let episodeService: EpisodeService;
  let subscriptionService: SubscriptionService;
  let loggerService: LoggerService;

  beforeAll(async () => {
    connection = await createConnection('test');
    episodeRepository = connection.getRepository(EpisodeEntity);
    showRepository = connection.getRepository(ShowEntity);
    subscriptionRepository = connection.getRepository(SubscriptionEntity);
    loggerService = new LoggerService();
    subscriptionService = new SubscriptionService(
      loggerService,
      subscriptionRepository
    );
    episodeService = new EpisodeService(
      loggerService,
      episodeRepository,
      subscriptionService
    );

    // We have to insert series before episode, due to relation
    await showRepository.save(
      showRepository.create(TvMazeShowToEntity(seedShow, null, null))
    );
  });
  afterAll(async () => await connection.close());

  it('should create many episodes and their relations', async () => {
    const episodes = await episodeService.createOrUpdateMany(
      seedEpisodes,
      seedShow.id
    );

    expect(episodes).toHaveLength(11);
  });

  // it('should return all episodes for series', async () => {
  //   const episodes = await episodeService.getByShow(seedShow.id);

  //   expect(episodes).toHaveLength(11);
  // });

  // it('should return an empty array when no episodes found for show', async () => {
  //   const episodes = await episodeService.getByShow(0);

  //   expect(episodes).toHaveLength(0);
  // });

  it('should return one episode', async () => {
    const episode = await episodeService.getOne(seedEpisodes[0].id);

    expect(episode.id).toBe(seedEpisodes[0].id.toString());
  });

  it('should throw an error when episode not found', async () => {
    const error = new NotFoundException();

    await expect(episodeService.getOne(0)).rejects.toThrow(error);
  });
});
