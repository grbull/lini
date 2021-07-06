/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { EpisodeAccordion } from './EpisodeAccordion';

const episodes: Omit<EpisodeDto, 'show'>[] = [
  {
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
  },
  {
    id: '1727898',
    name: 'He Built the Saturn V',
    season: 1,
    number: 2,
    type: 'regular',
    airdate: '2019-11-01',
    airtime: null,
    airstamp: '2019-11-01T12:00:00.000Z',
    runtime: 62,
    imageMedium: '/uploads/images/medium_landscape/218/545491.jpg',
    imageOriginal: '/uploads/images/original_untouched/218/545491.jpg',
    summary:
      "Director von Braun opposes President Nixon's directive, with dire consequences.",
  },
  {
    id: '1972621',
    name: 'Every Little Thing',
    season: 2,
    number: 1,
    type: 'regular',
    airdate: '2021-02-19',
    airtime: null,
    airstamp: '2021-02-19T12:00:00.000Z',
    runtime: 56,
    imageMedium: '/uploads/images/medium_landscape/284/710545.jpg',
    imageOriginal: '/uploads/images/original_untouched/284/710545.jpg',
    summary:
      'Nearly a decade later, technology and lunar exploration have taken huge strides—but a solar storm threatens the astronauts on Jamestown.',
  },
];

describe('EpisodeAccordion Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<EpisodeAccordion episodes={episodes} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render two episode accordion items', async () => {
    const { findAllByRole } = render(<EpisodeAccordion episodes={episodes} />);
    expect(await findAllByRole('button')).toHaveLength(2);
  });
});
