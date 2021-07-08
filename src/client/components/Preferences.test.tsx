/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Preferences } from './Preferences';

describe('Preferences Component', () => {
  const initialState: Partial<RootState> = {
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
  };

  beforeAll(() => {
    // Mock ssome ervice worker
    Object.defineProperties(navigator, {
      serviceWorker: {
        value: {
          ready: {
            pushManager: { getSubscription: () => null, subscribe: jest.fn() },
          },
        },
        writable: true,
      },
    });

    Object.defineProperties(window, {
      Notification: { value: { permission: 'denied' }, writable: true },
    });
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Preferences />, {
      state: initialState,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('changes theme correctly', async () => {
    const { getByLabelText, dispatch } = testSetup(<Preferences />, {
      state: initialState,
    });
    const themeSelect = getByLabelText('theme-select') as HTMLSelectElement;

    fireEvent.change(themeSelect, { target: { value: 'light' } });
    fireEvent.focusOut(themeSelect);

    await waitFor(() => expect(themeSelect.value).toBe('light'));
    expect(dispatch).toBeCalled();
  });
});
