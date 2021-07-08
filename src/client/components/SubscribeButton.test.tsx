/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent } from '@testing-library/react';
import React from 'react';

import { ShowDto } from '../../server/show/show.dto';
import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { SubscribeButton } from './SubscribeButton';

const showDto: ShowDto = {
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
};
describe('SubscribeButton Component', () => {
  const initialState: Partial<RootState> = {
    subscription: {
      status: 'idle',
      data: [{ show: showDto, dateCreated: '' }],
    },
  };

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<SubscribeButton showID={showDto.id} />, {
      state: initialState,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('can subscribe', () => {
    const { getByLabelText, dispatch } = testSetup(
      <SubscribeButton showID={0} />,
      {
        state: initialState,
      }
    );
    const button = getByLabelText('subscribe-button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('can unsubscribe', () => {
    const { getByLabelText, dispatch } = testSetup(
      <SubscribeButton showID={showDto.id} />,
      {
        state: initialState,
      }
    );
    const button = getByLabelText('subscribe-button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
