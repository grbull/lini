/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Navigation } from './Navigation';

describe('Navigation Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Navigation />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with user error', () => {
    const { asFragment } = testSetup(<Navigation />, {
      state: {
        user: { status: 'error', isLoggedIn: false, error: 'Generic Error' },
      },
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
