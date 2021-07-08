/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Home } from './Home';

const episodeDto: EpisodeDto = {
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
  show: {
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
  },
};

describe('Home View', () => {
  it('matches the snapshot when loading', () => {
    const initialState: Partial<RootState> = {
      schedule: {
        status: 'init',
        data: { future: [], past: [] },
      },
    };

    const { asFragment } = testSetup(<Home />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when error', () => {
    const initialState: Partial<RootState> = {
      schedule: {
        status: 'error',
        error: 'Generic error',
        data: { future: [], past: [] },
      },
    };

    const { asFragment } = testSetup(<Home />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loaded with no data', () => {
    const initialState: Partial<RootState> = {
      schedule: {
        status: 'idle',
        data: { future: [], past: [] },
      },
    };

    const { asFragment } = testSetup(<Home />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loaded with data', () => {
    const initialState: Partial<RootState> = {
      schedule: {
        status: 'idle',
        data: { future: [episodeDto], past: [episodeDto] },
      },
    };

    const { asFragment } = testSetup(<Home />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });
});
