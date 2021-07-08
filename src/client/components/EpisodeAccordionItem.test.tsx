/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent } from '@testing-library/react';
import React from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { testSetup } from '../utils/testSetup';
import { EpisodeAccordionItem } from './EpisodeAccordionItem';

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
];

// Unfortunately I can't get 100% line coverage because of optional chaining.

describe('EpisodeAccordionItem Component', () => {
  // eslint-disable-next-line init-declarations
  let handleExpanded: typeof jest.fn;

  beforeEach(() => {
    handleExpanded = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <EpisodeAccordionItem
        episodes={episodes}
        isExpanded={false}
        season={1}
        setExpanded={handleExpanded}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles being clicked when expanded', () => {
    const { getByRole } = testSetup(
      <EpisodeAccordionItem
        episodes={episodes}
        isExpanded
        season={1}
        setExpanded={handleExpanded}
      />
    );

    fireEvent.click(getByRole('button'));

    expect(handleExpanded).toHaveBeenCalled();
    expect(getByRole('button').scrollIntoView).toBeCalledTimes(0);
  });

  it('handles being clicked when not expanded', () => {
    const { getByRole } = testSetup(
      <EpisodeAccordionItem
        episodes={episodes}
        isExpanded={false}
        season={1}
        setExpanded={handleExpanded}
      />
    );

    fireEvent.click(getByRole('button'));

    expect(handleExpanded).toBeCalledTimes(1);
    expect(getByRole('button').scrollIntoView).toBeCalledTimes(1);
  });

  it('episodes should have a link to their page', () => {
    const { getByText } = testSetup(
      <EpisodeAccordionItem
        episodes={episodes}
        isExpanded
        season={1}
        setExpanded={handleExpanded}
      />
    );

    expect(getByText('Red Moon').closest('a')).toHaveAttribute(
      'href',
      '/episode/1627015'
    );
  });

  it('should render episodes without an airstamp', () => {
    const { getByText } = testSetup(
      <EpisodeAccordionItem
        episodes={[{ ...episodes[0], airstamp: null }]}
        isExpanded
        season={1}
        setExpanded={handleExpanded}
      />
    );

    expect(getByText('N/A')).toBeTruthy();
  });
});
