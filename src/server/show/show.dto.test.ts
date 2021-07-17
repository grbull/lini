import { classToPlain, plainToClass } from 'class-transformer';

import { CountryEntity } from '../country/country.entity';
import { EpisodeEntity } from '../episode/episode.entity';
import { NetworkEntity } from '../network/network.entity';
import { ShowDto } from './show.dto';
import { ShowEntity } from './show.entity';

const countryEntity: CountryEntity = Object.assign(new CountryEntity(), {
  id: 1,
  name: 'United States',
  code: 'US',
  timezone: 'America/New_York',
});

const networkEntity: NetworkEntity = Object.assign(new NetworkEntity(), {
  id: 10,
  name: 'Adult Swim',
  country: countryEntity,
});

const episodeEntity: EpisodeEntity = Object.assign(new EpisodeEntity(), {
  id: '14308',
  name: 'Pilot',
  season: 1,
  number: 1,
  type: 'regular',
  airdate: '2013-12-02',
  airtime: '22:30:00',
  airstamp: '2013-12-03T03:30:00.000Z',
  runtime: 30,
  imageMedium: '/uploads/images/medium_landscape/292/730352.jpg',
  imageOriginal: '/uploads/images/original_untouched/292/730352.jpg',
  summary:
    "Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.",
  show: 216,
});

const showEntity: ShowEntity = Object.assign(new ShowEntity(), {
  id: 216,
  name: 'Rick and Morty',
  type: 'Animation',
  language: 'English',
  genres: ['Comedy', 'Adventure', 'Science-Fiction'],
  status: 'Running',
  runtime: 30,
  runtimeAverage: 30,
  datePremiered: '2013-12-02',
  officialSite: 'http://www.adultswim.com/videos/rick-and-morty',
  scheduleTime: '23:00:00',
  scheduleDays: ['Sunday'],
  rating: 9,
  imageMedium: '/uploads/images/medium_portrait/1/3603.jpg',
  imageOriginal: '/uploads/images/original_untouched/1/3603.jpg',
  summary:
    'Rick is a mentally gifted, but sociopathic and alcoholic scientist and a grandfather to Morty; an awkward, impressionable, and somewhat spineless teenage boy. Rick moves into the family home of Morty, where he immediately becomes a bad influence.',
  network: networkEntity,
  webChannel: null,
  episodes: [episodeEntity],
  weight: 100,
  imdb: null,
  thetvdb: null,
  tvrage: null,
  isSeeded: true,
  subscriptions: [],
  dateCreated: '2021-07-17T13:11:30.611Z',
  dateUpdated: '2021-07-17T13:11:30.611Z',
});
const showDto = {
  id: 216,
  name: 'Rick and Morty',
  type: 'Animation',
  language: 'English',
  genres: ['Comedy', 'Adventure', 'Science-Fiction'],
  status: 'Running',
  runtime: 30,
  runtimeAverage: 30,
  datePremiered: '2013-12-02',
  officialSite: 'http://www.adultswim.com/videos/rick-and-morty',
  scheduleTime: '23:00:00',
  scheduleDays: ['Sunday'],
  rating: 9,
  imageMedium: '/uploads/images/medium_portrait/1/3603.jpg',
  imageOriginal: '/uploads/images/original_untouched/1/3603.jpg',
  summary:
    'Rick is a mentally gifted, but sociopathic and alcoholic scientist and a grandfather to Morty; an awkward, impressionable, and somewhat spineless teenage boy. Rick moves into the family home of Morty, where he immediately becomes a bad influence.',
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
  episodes: [
    {
      id: '14308',
      name: 'Pilot',
      season: 1,
      number: 1,
      type: 'regular',
      airdate: '2013-12-02',
      airtime: '22:30:00',
      airstamp: '2013-12-03T03:30:00.000Z',
      runtime: 30,
      imageMedium: '/uploads/images/medium_landscape/292/730352.jpg',
      imageOriginal: '/uploads/images/original_untouched/292/730352.jpg',
      summary:
        "Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.",
      show: 216,
    },
  ],
};

describe('Show Dto', () => {
  it('should transform entity to dto', () => {
    expect(classToPlain(showEntity)).toStrictEqual(showDto);
  });

  it('should transform dto object to dto class', () => {
    const showDtoClass = Object.assign(new ShowDto(), showDto);

    expect(plainToClass(ShowDto, showDto)).toStrictEqual(showDtoClass);
  });
});
