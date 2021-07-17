import { TvMazeShow } from './tvmaze.types';
import {
  isValidTime,
  sanitizeUrl,
  stripHtml,
  tvMazeEpisodeToEntity,
  TvMazeShowToEntity,
} from './tvmaze.utils';

describe('TvMaze Utils', () => {
  describe('stripHtml', () => {
    it('should strip html', () => {
      expect(stripHtml('<p>Test</p>')).toBe('Test');
    });

    it('should return null', () => {
      expect(stripHtml(null)).toBe(null);
    });
  });

  describe('sanitizeUrl', () => {
    it('should sanitize url', () => {
      const sanitizedUrl = sanitizeUrl(
        'https://static.tvmaze.com/uploads/images/medium_portrait/1/3603.jpg'
      );
      expect(sanitizedUrl).toBe('/uploads/images/medium_portrait/1/3603.jpg');
    });

    it('should return null', () => {
      expect(sanitizeUrl(undefined)).toBe(null);
    });
  });

  describe('isValidTime', () => {
    it('should return true', () => {
      expect(isValidTime('00:00')).toBeTruthy();
      expect(isValidTime('23:59')).toBeTruthy();
    });

    it('should return false', () => {
      expect(isValidTime('24:00')).toBeFalsy();
      expect(isValidTime('23:60')).toBeFalsy();
      expect(isValidTime('23:59:00')).toBeFalsy();
    });
  });

  describe('TvMazeShowToEntity', () => {
    it('should handle all values', () => {
      const tvMazeShow: TvMazeShow = {
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
      const showEntity = {
        datePremiered: '2013-12-02',
        genres: ['Comedy', 'Adventure', 'Science-Fiction'],
        id: 216,
        imageMedium: '/uploads/images/medium_portrait/1/3603.jpg',
        imageOriginal: '/uploads/images/original_untouched/1/3603.jpg',
        imdb: 'tt2861424',
        language: 'English',
        name: 'Rick and Morty',
        network: null,
        officialSite: 'http://www.adultswim.com/videos/rick-and-morty',
        rating: 9,
        runtime: 30,
        runtimeAverage: 30,
        scheduleDays: ['Sunday'],
        scheduleTime: '23:00',
        status: 'Running',
        summary:
          'Rick is a mentally gifted, but sociopathic and alcoholic scientist and a grandfather to Morty; an awkward, impressionable, and somewhat spineless teenage boy. Rick moves into the family home of Morty, where he immediately becomes a bad influence.',
        thetvdb: 275274,
        tvrage: 33381,
        type: 'Animation',
        webChannel: null,
        weight: 100,
      };
      expect(TvMazeShowToEntity(tvMazeShow, null, null)).toStrictEqual(
        showEntity
      );
    });

    it('should handle null/undefined values', () => {
      const tvMazeShow: TvMazeShow = {
        id: 216,
        url: 'https://www.tvmaze.com/shows/216/rick-and-morty',
        name: 'Rick and Morty',
        type: 'Animation',
        language: null,
        genres: ['Comedy', 'Adventure', 'Science-Fiction'],
        status: 'Running',
        runtime: null,
        averageRuntime: null,
        premiered: null,
        officialSite: null,
        schedule: { time: '', days: ['Sunday'] },
        rating: { average: null },
        weight: 100,
        network: null,
        webChannel: null,
        dvdCountry: null,
        externals: { tvrage: null, thetvdb: null, imdb: null },
        image: null,
        summary: null,
        updated: 1626299432,
        _links: {
          self: { href: 'https://api.tvmaze.com/shows/216' },
          previousepisode: { href: 'https://api.tvmaze.com/episodes/2121946' },
        },
      };
      const showEntity = {
        datePremiered: null,
        genres: ['Comedy', 'Adventure', 'Science-Fiction'],
        id: 216,
        imageMedium: null,
        imageOriginal: null,
        imdb: null,
        language: null,
        name: 'Rick and Morty',
        network: null,
        officialSite: null,
        rating: null,
        runtime: null,
        runtimeAverage: null,
        scheduleDays: ['Sunday'],
        scheduleTime: null,
        status: 'Running',
        summary: null,
        thetvdb: null,
        tvrage: null,
        type: 'Animation',
        webChannel: null,
        weight: 100,
      };

      expect(TvMazeShowToEntity(tvMazeShow, null, null)).toStrictEqual(
        showEntity
      );
    });
  });

  describe('tvMazeEpisodeToEntity', () => {
    it('should handle all values', () => {
      const tvMazeEpisode = {
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
      };
      const episodeEntity = {
        airdate: '2013-12-02',
        airstamp: '2013-12-03T03:30:00+00:00',
        airtime: '22:30',
        id: '14308',
        imageMedium: '/uploads/images/medium_landscape/292/730352.jpg',
        imageOriginal: '/uploads/images/original_untouched/292/730352.jpg',
        name: 'Pilot',
        number: 1,
        runtime: 30,
        season: 1,
        show: 216,
        summary:
          "Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.",
        type: 'regular',
      };

      expect(tvMazeEpisodeToEntity(tvMazeEpisode, 216)).toStrictEqual(
        episodeEntity
      );
    });

    it('should handle null/undefined values', () => {
      const tvMazeEpisode = {
        id: 14308,
        url: 'https://www.tvmaze.com/episodes/14308/rick-and-morty-1x01-pilot',
        name: 'Pilot',
        season: 1,
        number: 1,
        type: 'regular',
        airdate: '',
        airtime: '',
        airstamp: '2013-12-03T03:30:00+00:00',
        runtime: 30,
        image: null,
        summary: null,
        _links: {
          self: { href: 'https://api.tvmaze.com/episodes/14308' },
        },
      };
      const episodeEntity = {
        airdate: null,
        airstamp: '2013-12-03T03:30:00+00:00',
        airtime: null,
        id: '14308',
        imageMedium: null,
        imageOriginal: null,
        name: 'Pilot',
        number: 1,
        runtime: 30,
        season: 1,
        show: 216,
        summary: null,
        type: 'regular',
      };

      expect(tvMazeEpisodeToEntity(tvMazeEpisode, 216)).toStrictEqual(
        episodeEntity
      );
    });
  });
});
