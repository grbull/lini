/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { ShowGridSkeleton } from './ShowGridSkeleton';

describe('ShowGridSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<ShowGridSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
