/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { testSetup } from '../utils/testSetup';
import { EpisodeInfo } from './EpisodeInfo';

const episode: EpisodeDto = {
  id: '1627015',
  name: 'Red Moon',
  season: 1,
  number: 1,
  type: 'regular',
  airdate: '2019-11-01',
  airtime: null,
  airstamp: '2019-11-01T12:00:00.000Z',
  runtime: 65,
  imageMedium: '/uploads/images/medium_landscape/218/545490.jpg',
  imageOriginal: '/uploads/images/original_untouched/218/545490.jpg',
  summary:
    'NASA is in crisis as the Soviets land the first man on the moon in 1969, the beginning of an alternate history.',
  show: {
    id: 41414,
    name: 'For All Mankind',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Science-Fiction'],
    status: 'Running',
    runtime: null,
    runtimeAverage: 61,
    datePremiered: '2019-11-01',
    officialSite:
      'https://tv.apple.com/us/show/for-all-mankind/umc.cmc.6wsi780sz5tdbqcf11k76mkp7',
    scheduleTime: null,
    scheduleDays: ['Friday'],
    rating: 7.1,
    imageMedium: '/uploads/images/medium_portrait/293/732962.jpg',
    imageOriginal: '/uploads/images/original_untouched/293/732962.jpg',
    summary:
      'Imagine a world where the global space race never ended. This "what if" take on history from Ronald D. Moore (Outlander, Battlestar Galactica) spotlights the lives of NASA astronauts—the heroes and rock stars of their time—and their families.',
    network: null,
    webChannel: null,
  },
};

describe('EpisodeInfo Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<EpisodeInfo episode={episode} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render episodes without an airstamp', () => {
    const { getAllByText } = testSetup(
      <EpisodeInfo episode={{ ...episode, airstamp: null }} />
    );

    expect(getAllByText('N/A')).toHaveLength(2);
  });

  it('should render episodes without a summary', () => {
    const { getByText } = testSetup(
      <EpisodeInfo episode={{ ...episode, summary: null }} />
    );

    expect(getByText('Summary unavailable.')).toBeTruthy();
  });
});
