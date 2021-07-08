/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { ShowInfoSkeleton } from './ShowInfoSkeleton';

describe('ShowInfoSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<ShowInfoSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
