/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { SubscriptionDto } from '../../server/subscription/subscription.dto';
import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Library } from './Library';

const subscriptionDtos: SubscriptionDto[] = [
  {
    dateCreated: '2021-06-27T15:18:43.062Z',
    show: {
      id: 41007,
      name: 'Loki',
      type: 'Scripted',
      language: 'English',
      genres: ['Action', 'Adventure', 'Science-Fiction'],
      status: 'Running',
      runtime: null,
      runtimeAverage: 48,
      datePremiered: '2021-06-09',
      officialSite: 'https://www.marvel.com/tv-shows/loki/1',
      scheduleTime: null,
      scheduleDays: ['Wednesday'],
      rating: 8.3,
      imageMedium: '/uploads/images/medium_portrait/320/801227.jpg',
      imageOriginal: '/uploads/images/original_untouched/320/801227.jpg',
      summary:
        'Loki follows the trickster and shape-shifter god who pops up throughout human history as an unlikely influencer on historical events.',
      network: null,
      webChannel: { id: 287, name: 'Disney+', country: null },
    },
  },
  {
    dateCreated: '2021-06-21T14:37:16.769Z',
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
  },
];

describe('Library View', () => {
  it('matches the snapshot when loading', () => {
    const initialState: Partial<RootState> = {
      subscription: {
        status: 'loading',
        data: [],
      },
    };

    const { asFragment } = testSetup(<Library />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when error', () => {
    const initialState: Partial<RootState> = {
      subscription: {
        status: 'error',
        error: 'Generic error',
        data: [],
      },
    };

    const { asFragment } = testSetup(<Library />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loaded with no data', () => {
    const initialState: Partial<RootState> = {
      subscription: {
        status: 'idle',
        data: [],
      },
    };

    const { asFragment } = testSetup(<Library />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loaded with data', () => {
    const initialState: Partial<RootState> = {
      subscription: {
        status: 'idle',
        data: subscriptionDtos,
      },
    };

    const { asFragment } = testSetup(<Library />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });
});
