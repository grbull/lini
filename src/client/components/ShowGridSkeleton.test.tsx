/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { ShowGridSkeleton } from './ShowGridSkeleton';

function setup(): RenderResult {
  const utils = render(<ShowGridSkeleton />);

  return { ...utils };
}

describe('ShowGridSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
