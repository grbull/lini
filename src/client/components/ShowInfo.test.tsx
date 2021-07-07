/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { ShowWithEpisodesDto } from '../../server/show/show.dto';
import { ShowInfo } from './ShowInfo';

const showDto: ShowWithEpisodesDto = {
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
  webChannel: { id: 287, name: 'Disney+', country: null },
  episodes: [
    {
      id: '1984092',
      name: 'Glorious Purpose',
      season: 1,
      number: 1,
      type: 'regular',
      airdate: '2021-06-09',
      airtime: null,
      airstamp: '2021-06-09T12:00:00.000Z',
      runtime: 50,
      imageMedium: '/uploads/images/medium_landscape/327/817543.jpg',
      imageOriginal: '/uploads/images/original_untouched/327/817543.jpg',
      summary:
        "Loki, the God of Mischief, finds himself out of time and in an unusual place and forced — against his godly disposition — to cooperate with others. Welcome to the TVA, y'all!",
    },
    {
      id: '2095474',
      name: 'The Variant',
      season: 1,
      number: 2,
      type: 'regular',
      airdate: '2021-06-16',
      airtime: null,
      airstamp: '2021-06-16T12:00:00.000Z',
      runtime: 53,
      imageMedium: '/uploads/images/medium_landscape/329/823863.jpg',
      imageOriginal: '/uploads/images/original_untouched/329/823863.jpg',
      summary:
        'Mobius puts Loki to work investigating The Variant, but not everyone at the TVA is thrilled to be working alongside The God of Mischief.',
    },
    {
      id: '2095475',
      name: 'Lamentis',
      season: 1,
      number: 3,
      type: 'regular',
      airdate: '2021-06-23',
      airtime: null,
      airstamp: '2021-06-23T12:00:00.000Z',
      runtime: 41,
      imageMedium: '/uploads/images/medium_landscape/332/831232.jpg',
      imageOriginal: '/uploads/images/original_untouched/332/831232.jpg',
      summary:
        'Loki finds himself trapped in an apocalypse with a dead TemPad and the last person he wants by his side: the Loki Variant, Sylvie. Now the two must find their way off of the doomed moon before complete annihilation.',
    },
    {
      id: '2095476',
      name: 'The Nexus Event',
      season: 1,
      number: 4,
      type: 'regular',
      airdate: '2021-06-30',
      airtime: null,
      airstamp: '2021-06-30T12:00:00.000Z',
      runtime: 48,
      imageMedium: '/uploads/images/medium_landscape/334/836858.jpg',
      imageOriginal: '/uploads/images/original_untouched/334/836858.jpg',
      summary:
        "Loki and Sylvie find their way off the Lamentis-1 mere moments before complete annihilation. Now, the question on everyone's mind, especially those in charge of the TVA — how did these two variants create a Nexus Event in the face of an apocalypse?",
    },
    {
      id: '2095477',
      name: 'Journey Into Mystery',
      season: 1,
      number: 5,
      type: 'regular',
      airdate: '2021-07-07',
      airtime: null,
      airstamp: '2021-07-07T12:00:00.000Z',
      runtime: 48,
      imageMedium: '/uploads/images/medium_landscape/337/843491.jpg',
      imageOriginal: '/uploads/images/original_untouched/337/843491.jpg',
      summary:
        "Upon discovering the Time Keepers aren't real, Judge Renslayer prunes Loki with the Time Stick. Now in an unknown land surrounded by variant Lokis, they urge him to follow them. Meanwhile, turning on the judge, Sylvie demands to be told everything about the TVA.",
    },
    {
      id: '2095478',
      name: 'Episode 6',
      season: 1,
      number: 6,
      type: 'regular',
      airdate: '2021-07-14',
      airtime: null,
      airstamp: '2021-07-14T12:00:00.000Z',
      runtime: null,
      imageMedium: null,
      imageOriginal: null,
      summary: null,
    },
  ],
};

function setup(show: ShowWithEpisodesDto): RenderResult {
  const utils = render(<ShowInfo show={show} />);

  return { ...utils };
}

describe('ShowInfo Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup(showDto);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with null values', () => {
    const { asFragment } = setup({
      ...showDto,
      network: null,
      webChannel: null,
      scheduleDays: [],
      scheduleTime: null,
      runtime: null,
      officialSite: null,
      rating: null,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with network value', () => {
    const { asFragment } = setup({
      ...showDto,
      network: {
        id: 1,
        name: 'Test network',
        country: {
          code: 'UK',
          name: 'United Kingdom',
          timezone: 'London/Europe',
        },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with a schedule', () => {
    const { asFragment } = setup({
      ...showDto,
      scheduleTime: '20:00',
      runtime: 60,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
