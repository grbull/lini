/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { OfflineBanner } from './OfflineBanner';

describe('OfflineBanner Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<OfflineBanner />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when offline', () => {
    window.addEventListener = jest
      .fn()
      .mockImplementation((event: string, callback) => {
        if (event === 'offline') {
          callback();
        }
      });

    const { asFragment } = testSetup(<OfflineBanner />);

    expect(asFragment()).toMatchSnapshot();
  });
});
