/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { testSetup } from '../utils/testSetup';
import { EpisodePanel } from './EpisodePanel';

const episodes: EpisodeDto[] = [
  {
    id: '2095477',
    name: 'Episode 5',
    season: 1,
    number: 5,
    type: 'regular',
    airdate: '2021-07-07',
    airtime: null,
    airstamp: '2021-07-07T12:00:00.000Z',
    runtime: null,
    imageMedium: null,
    imageOriginal: null,
    summary: null,
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
      rating: 8.2,
      imageMedium: '/uploads/images/medium_portrait/320/801227.jpg',
      imageOriginal: '/uploads/images/original_untouched/320/801227.jpg',
      summary:
        'Loki follows the trickster and shape-shifter god who pops up throughout human history as an unlikely influencer on historical events.',
      network: null,
      webChannel: null,
    },
  },
];

describe('EpisodePanel Component', () => {
  beforeAll(() => {
    // For snapshot consistency we need to fake the date
    Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1625584251217);
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<EpisodePanel episodes={episodes} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render episodes without an airstamp', () => {
    const { getByText } = testSetup(
      <EpisodePanel episodes={[{ ...episodes[0], airstamp: null }]} />
    );

    expect(getByText('N/A')).toBeTruthy();
  });
});
