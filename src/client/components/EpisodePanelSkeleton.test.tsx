/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { EpisodePanelSkeleton } from './EpisodePanelSkeleton';

describe('EpisodePanelSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<EpisodePanelSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
