/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { ShowInfoSkeleton } from './ShowInfoSkeleton';

function setup(): RenderResult {
  const utils = render(<ShowInfoSkeleton />);

  return { ...utils };
}

describe('ShowInfoSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
