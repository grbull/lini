/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { ShowDto } from '../../server/show/show.dto';
import { reducers } from '../redux/store';
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

function setup(id: number): RenderResult & {
  button: HTMLButtonElement;
  dispatch: typeof jest.fn;
} {
  const store = configureStore({
    reducer: reducers,
    preloadedState: {
      subscription: {
        status: 'idle',
        data: [{ show: showDto, dateCreated: '' }],
      },
    },
  });

  const dispatch = jest.fn();
  store.dispatch = dispatch;

  const utils = render(
    <Provider store={store}>
      <SubscribeButton showID={id} />
    </Provider>
  );

  const button = utils.getByLabelText('subscribe-button') as HTMLButtonElement;

  return { button, dispatch, ...utils };
}

describe('SubscribeButton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup(showDto.id);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can subscribe', () => {
    const { button, dispatch } = setup(0);

    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('can unsubscribe', () => {
    const { button, dispatch } = setup(showDto.id);

    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
