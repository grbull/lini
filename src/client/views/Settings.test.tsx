/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Settings } from './Settings';

describe('Settings View', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Settings />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with user data', () => {
    const initialState: Partial<RootState> = {
      user: {
        status: 'idle',
        isLoggedIn: true,
        data: {
          email: 'test@email.com',
          theme: 'auto',
          notifications: true,
          dateCreated: '2021-07-08T13:59:33.937Z',
          dateModified: '2021-07-08T13:59:33.937Z',
        },
      },
    };

    const { asFragment } = testSetup(<Settings />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });
});
