/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { configureStore } from '@reduxjs/toolkit';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { reducers } from '../redux/store';
import { Preferences } from './Preferences';

function setup(): RenderResult & { themeSelect: HTMLSelectElement } {
  const store = configureStore({
    reducer: reducers,
    preloadedState: {
      user: {
        status: 'idle',
        data: {
          theme: 'auto',
          email: 'test@email.com',
          notifications: false,
          dateCreated: '',
          dateModified: '',
        },
      },
    },
  });

  // Mock service worker
  Object.defineProperties(navigator, {
    serviceWorker: {
      value: {
        ready: {
          pushManager: {
            getSubscription: () => null,
            subscribe: jest.fn(),
          },
        },
      },
      writable: true,
    },
  });

  Object.defineProperties(window, {
    Notification: {
      value: {
        permission: 'denied',
      },
      writable: true,
    },
  });

  // I would have liked to confirm dispatch was called but I don't know a
  // a good way to mock it yet.
  // const dispatch = jest.fn();
  // store.dispatch = jest.fn().mockImplementation(() => dispatch);
  // jest.mock('react-redux', () => ({
  //   useDispatch: jest.fn(() => dispatch),
  // }));

  const utils = render(
    <Provider store={store}>
      <Preferences />
    </Provider>
  );

  const themeSelect = utils.getByLabelText('theme-select') as HTMLSelectElement;

  return { themeSelect, ...utils };
}

describe('Preferences Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes theme correctly', async () => {
    const { themeSelect } = setup();

    fireEvent.change(themeSelect, { target: { value: 'light' } });
    fireEvent.focusOut(themeSelect);

    await waitFor(() => expect(themeSelect.value).toBe('light'));
  });
});
