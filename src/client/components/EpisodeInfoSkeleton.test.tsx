/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { EpisodeInfoSkeleton } from './EpisodeInfoSkeleton';

describe('EpisodeInfoSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<EpisodeInfoSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
