/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { Skeleton } from './Skeleton';

function setup(): RenderResult {
  const utils = render(<Skeleton className="any" />);

  return { ...utils };
}

describe('Skeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
