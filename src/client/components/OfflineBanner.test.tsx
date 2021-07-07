/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { OfflineBanner } from './OfflineBanner';

function setup(): RenderResult {
  const utils = render(<OfflineBanner />);

  return { ...utils };
}

describe('OfflineBanner Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
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

    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
