/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { ShowDto } from '../../server/show/show.dto';
import { testSetup } from '../utils/testSetup';
import { ShowGrid } from './ShowGrid';

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

describe('ShowGrid Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<ShowGrid shows={[showDto]} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when empty', () => {
    const { asFragment } = testSetup(<ShowGrid shows={[]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
