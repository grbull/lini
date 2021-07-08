/**
 * @jest-environment jsdom
 */

import { createLocation, createMemoryHistory } from 'history';
import React from 'react';
import { match } from 'react-router-dom';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Episode } from './Episode';

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

describe('Episode View', () => {
  const history = createMemoryHistory();
  const path = '/route/:id';
  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params: { id: '1' },
  };
  const location = createLocation(match.url);

  it('matches the snapshot when loading', () => {
    const { asFragment, dispatch } = testSetup(
      <Episode history={history} location={location} match={match} />,
      { history }
    );

    expect(asFragment()).toMatchSnapshot();
    expect(dispatch).toBeCalled();
  });

  it('matches the snapshot when there is an error', () => {
    const initialState: Partial<RootState> = {
      episode: { status: 'error', error: 'Generic error' },
    };

    const { asFragment } = testSetup(
      <Episode history={history} location={location} match={match} />,
      { history, state: initialState }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when there is an episode', () => {
    const initialState: Partial<RootState> = {
      episode: { status: 'idle', data: episodeDto },
    };

    const { asFragment } = testSetup(
      <Episode history={history} location={location} match={match} />,
      { history, state: initialState }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
