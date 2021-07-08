/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { ShowDto } from '../../server/show/show.dto';
import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Search } from './Search';

const showDto: ShowDto = {
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
};

describe('Search View', () => {
  it('matches the snapshot', () => {
    const initialState: Partial<RootState> = {
      search: {
        status: 'init',
      },
    };

    const { asFragment } = testSetup(<Search />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loading', () => {
    const initialState: Partial<RootState> = {
      search: {
        status: 'loading',
      },
    };

    const { asFragment } = testSetup(<Search />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when error', () => {
    const initialState: Partial<RootState> = {
      search: {
        status: 'error',
        error: 'Generic error',
      },
    };

    const { asFragment } = testSetup(<Search />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with no data', () => {
    const initialState: Partial<RootState> = {
      search: {
        status: 'idle',
        data: [],
      },
    };

    const { asFragment } = testSetup(<Search />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with data', () => {
    const initialState: Partial<RootState> = {
      search: {
        status: 'idle',
        data: [showDto],
      },
    };

    const { asFragment } = testSetup(<Search />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });
});
